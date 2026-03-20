'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useBetSlipStore } from '@/store/betSlipStore';

const gameData: Record<string, { name: string; emoji: string; desc: string }> = {
  'slots-classic': { name: 'Slots Clássico', emoji: '🎰', desc: 'Gire os rolos!' },
  'blackjack-pro': { name: 'Blackjack Pro', emoji: '🃏', desc: 'Chegue a 21!' },
  'roulette-euro': { name: 'Roleta Europeia', emoji: '🎡', desc: 'Aposte no número!' },
  'space-slots': { name: 'Space Slots', emoji: '🚀', desc: 'Slots espaciais!' },
  'crash-game': { name: 'Crash Game', emoji: '📈', desc: 'Saia antes do crash!' },
  'dice-roll': { name: 'Dados Quânticos', emoji: '🎲', desc: 'Preveja o resultado!' },
  'baccarat-vip': { name: 'Bacará VIP', emoji: '💎', desc: 'Jogo dos elegantes!' },
  'poker-texas': { name: "Texas Hold'em", emoji: '♠️', desc: 'Clássico do pôquer!' },
  'slot-aztec': { name: 'Aztec Treasures', emoji: '🏺', desc: 'Tesouros escondidos!' },
  'slot-cyber': { name: 'Cyber Jackpot', emoji: '🤖', desc: 'Jackpot do futuro!' },
  'roulette-american': { name: 'Roleta Americana', emoji: '🎯', desc: 'Versão americana!' },
  'mines-game': { name: 'Campo Minado', emoji: '💣', desc: 'Evite as minas!' },
  'live-blackjack': { name: 'Blackjack Ao Vivo', emoji: '🃏', desc: 'Com dealer ao vivo!' },
  'live-roulette': { name: 'Roleta Ao Vivo', emoji: '🎡', desc: 'Roleta com dealer!' },
  'live-baccarat': { name: 'Bacará Ao Vivo', emoji: '💎', desc: 'Bacará ao vivo!' },
  'live-poker': { name: 'Pôquer Ao Vivo', emoji: '♠️', desc: 'Pôquer ao vivo!' },
};

const PLAY_COST = 10;

export default function GamePage({ params }: { params: { gameId: string } }) {
  const game = gameData[params.gameId] || { name: params.gameId, emoji: '🎮', desc: 'Jogo virtual' };
  const { user, updateBalance } = useBetSlipStore();
  const [result, setResult] = useState<{ win: boolean; amount: number; message: string } | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [rounds, setRounds] = useState(0);

  const handlePlay = () => {
    if (!user) {
      setResult({ win: false, amount: 0, message: 'Faça login para jogar!' });
      return;
    }
    if (user.balance < PLAY_COST) {
      setResult({ win: false, amount: 0, message: 'Saldo insuficiente!' });
      return;
    }

    setSpinning(true);
    setTimeout(() => {
      const win = Math.random() > 0.45;
      const multiplier = win ? parseFloat((1.5 + Math.random() * 3).toFixed(2)) : 0;
      const winAmount = win ? PLAY_COST * multiplier : 0;
      const newBalance = user.balance - PLAY_COST + winAmount;
      updateBalance(Math.max(0, newBalance));
      setRounds((r) => r + 1);
      setResult({
        win,
        amount: win ? winAmount - PLAY_COST : PLAY_COST,
        message: win
          ? `🎉 Você ganhou! Multiplicador: ${multiplier}x`
          : '😞 Não foi dessa vez. Tente novamente!',
      });
      setSpinning(false);
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <Link href="/casino" className="text-gray-400 hover:text-white text-sm mb-6 inline-block">
        ← Voltar ao Cassino
      </Link>

      <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 text-center">
        <div className={`text-8xl mb-4 ${spinning ? 'animate-spin' : ''}`}>{game.emoji}</div>
        <h1 className="text-2xl font-black text-white mb-2">{game.name}</h1>
        <p className="text-gray-400 mb-2">{game.desc}</p>

        <div className="bg-yellow-900/20 border border-yellow-700/30 rounded-lg px-4 py-2 mb-6 inline-block">
          <p className="text-yellow-400 text-xs">⚠️ Simulação fictícia — apenas para estudo</p>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-400">Custo por rodada:</span>
            <span className="text-white font-bold">R$ {PLAY_COST.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-400">Seu saldo:</span>
            <span className="text-[#00ff87] font-bold">
              {user
                ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(user.balance)
                : 'Faça login'}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Rodadas jogadas:</span>
            <span className="text-white font-bold">{rounds}</span>
          </div>
        </div>

        {result && (
          <div className={`rounded-xl p-4 mb-6 ${result.win ? 'bg-green-900/50 border border-green-700' : 'bg-red-900/50 border border-red-700'}`}>
            <p className="font-bold text-lg">{result.message}</p>
            <p className={`text-sm mt-1 ${result.win ? 'text-green-400' : 'text-red-400'}`}>
              {result.win ? `+R$ ${result.amount.toFixed(2)}` : `-R$ ${result.amount.toFixed(2)}`}
            </p>
          </div>
        )}

        <button
          onClick={handlePlay}
          disabled={spinning || !user || (user?.balance ?? 0) < PLAY_COST}
          className="w-full bg-[#00ff87] text-black font-black text-lg py-4 rounded-xl hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {spinning ? '🎲 Jogando...' : `Jogar (R$ ${PLAY_COST.toFixed(2)})`}
        </button>

        {!user && (
          <p className="text-gray-400 text-sm mt-4">
            <Link href="/auth/login" className="text-[#00ff87] hover:underline">Faça login</Link> para jogar
          </p>
        )}
      </div>
    </div>
  );
}
