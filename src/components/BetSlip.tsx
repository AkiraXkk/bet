'use client';

import { useState } from 'react';
import { useBetSlipStore } from '@/store/betSlipStore';

export default function BetSlip() {
  const { selections, removeSelection, clearSelections, user, updateBalance } = useBetSlipStore();
  const [amounts, setAmounts] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  if (selections.length === 0 && !isOpen) return null;

  const getAmount = (eventId: string) => parseFloat(amounts[eventId] || '0') || 0;
  const getPayout = (eventId: string, odds: number) => (getAmount(eventId) * odds).toFixed(2);

  const handleBet = async (eventId: string, odds: number) => {
    if (!user) {
      setMessage({ text: 'Faça login para apostar.', type: 'error' });
      return;
    }
    const amount = getAmount(eventId);
    if (amount <= 0) {
      setMessage({ text: 'Insira um valor válido.', type: 'error' });
      return;
    }
    if (amount > user.balance) {
      setMessage({ text: 'Saldo insuficiente.', type: 'error' });
      return;
    }
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/place-bet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ eventId, amount, odds }),
      });
      const data = await res.json();
      if (res.ok) {
        updateBalance(data.newBalance);
        removeSelection(eventId);
        setMessage({ text: `Aposta de R$${amount.toFixed(2)} realizada!`, type: 'success' });
      } else {
        setMessage({ text: data.error || 'Erro ao apostar.', type: 'error' });
      }
    } catch {
      setMessage({ text: 'Erro de conexão.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-50 bg-[#00ff87] text-black font-bold px-4 py-3 rounded-full shadow-lg hover:bg-emerald-400 transition-colors"
      >
        🎯 {selections.length > 0 ? `Boletim (${selections.length})` : 'Boletim'}
      </button>

      {/* Slip panel */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 z-50 w-80 bg-gray-900 border border-gray-700 rounded-xl shadow-2xl">
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <h3 className="font-bold text-white">Boletim de Apostas</h3>
            <div className="flex items-center space-x-2">
              {selections.length > 0 && (
                <button onClick={clearSelections} className="text-xs text-gray-400 hover:text-red-400">
                  Limpar
                </button>
              )}
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">✕</button>
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto p-3 space-y-3">
            {selections.length === 0 ? (
              <p className="text-gray-400 text-sm text-center py-4">Nenhuma seleção</p>
            ) : (
              selections.map((sel) => (
                <div key={sel.eventId} className="bg-gray-800 rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-xs text-gray-400 truncate max-w-[180px]">{sel.eventTitle}</p>
                      <p className="text-sm font-medium text-white">{sel.team}</p>
                      <p className="text-[#00ff87] font-bold">{sel.odds.toFixed(2)}</p>
                    </div>
                    <button onClick={() => removeSelection(sel.eventId)} className="text-gray-500 hover:text-red-400 text-lg">✕</button>
                  </div>
                  <input
                    type="number"
                    placeholder="Valor (R$)"
                    value={amounts[sel.eventId] || ''}
                    onChange={(e) => setAmounts({ ...amounts, [sel.eventId]: e.target.value })}
                    className="w-full bg-gray-700 text-white text-sm rounded px-3 py-2 mb-2 outline-none border border-gray-600 focus:border-[#00ff87]"
                    min="1"
                  />
                  {getAmount(sel.eventId) > 0 && (
                    <p className="text-xs text-gray-400 mb-2">
                      Retorno potencial: <span className="text-[#00ff87] font-bold">R$ {getPayout(sel.eventId, sel.odds)}</span>
                    </p>
                  )}
                  <button
                    onClick={() => handleBet(sel.eventId, sel.odds)}
                    disabled={loading}
                    className="w-full bg-[#00ff87] text-black font-bold py-2 rounded hover:bg-emerald-400 disabled:opacity-50 transition-colors"
                  >
                    {loading ? 'Processando...' : 'Apostar'}
                  </button>
                </div>
              ))
            )}
          </div>

          {message && (
            <div className={`m-3 p-2 rounded text-sm text-center ${message.type === 'success' ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>
              {message.text}
            </div>
          )}

          {user && (
            <div className="p-3 border-t border-gray-700 text-center">
              <p className="text-xs text-gray-400">Saldo disponível</p>
              <p className="text-[#00ff87] font-bold">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(user.balance)}
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
}
