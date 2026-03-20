'use client';

import Link from 'next/link';
import { useState } from 'react';

const games = [
  { id: 'slots-classic', name: 'Slots Clássico', emoji: '🎰', desc: 'Gire os rolos e ganhe!', category: 'Slots', rtp: '96.5%' },
  { id: 'blackjack-pro', name: 'Blackjack Pro', emoji: '🃏', desc: 'Chegue o mais perto de 21!', category: 'Cartas', rtp: '99.5%' },
  { id: 'roulette-euro', name: 'Roleta Europeia', emoji: '🎡', desc: 'Aposte no seu número!', category: 'Roleta', rtp: '97.3%' },
  { id: 'baccarat-vip', name: 'Bacará VIP', emoji: '💎', desc: 'O jogo dos elegantes', category: 'Cartas', rtp: '98.9%' },
  { id: 'space-slots', name: 'Space Slots', emoji: '🚀', desc: 'Slots do futuro espacial!', category: 'Slots', rtp: '97.1%' },
  { id: 'poker-texas', name: "Texas Hold'em", emoji: '♠️', desc: 'O clássico do pôquer', category: 'Pôquer', rtp: '98.0%' },
  { id: 'crash-game', name: 'Crash Game', emoji: '📈', desc: 'Saia antes que crash!', category: 'Especial', rtp: '97.0%' },
  { id: 'dice-roll', name: 'Dados Quânticos', emoji: '🎲', desc: 'Preveja o resultado!', category: 'Dados', rtp: '96.8%' },
  { id: 'slot-aztec', name: 'Aztec Treasures', emoji: '🏺', desc: 'Tesouros escondidos!', category: 'Slots', rtp: '96.2%' },
  { id: 'slot-cyber', name: 'Cyber Jackpot', emoji: '🤖', desc: 'Jackpot do futuro!', category: 'Slots', rtp: '95.8%' },
  { id: 'roulette-american', name: 'Roleta Americana', emoji: '🎯', desc: 'Versão americana!', category: 'Roleta', rtp: '94.7%' },
  { id: 'mines-game', name: 'Campo Minado', emoji: '💣', desc: 'Evite as minas!', category: 'Especial', rtp: '97.5%' },
];

const filterCategories = ['Todos', 'Slots', 'Cartas', 'Roleta', 'Pôquer', 'Dados', 'Especial'];

export default function CasinoPage() {
  const [filter, setFilter] = useState('Todos');
  const filtered = filter === 'Todos' ? games : games.filter((g) => g.category === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="relative bg-gradient-to-r from-purple-900 via-gray-800 to-gray-900 rounded-xl p-8 mb-6 border border-gray-700 overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #9333ea 0%, transparent 50%)' }} />
        <div className="relative z-10">
          <div className="inline-block bg-purple-500/10 border border-purple-500/30 rounded-full px-3 py-1 text-xs text-purple-400 font-medium mb-3">
            🎰 Cassino Virtual
          </div>
          <h1 className="text-3xl font-black text-white mb-2">Cassino BetStudy</h1>
          <p className="text-gray-400">Explore jogos de cassino com créditos fictícios. Sem dinheiro real!</p>
        </div>
        <div className="absolute right-8 top-1/2 -translate-y-1/2 text-8xl opacity-20 hidden lg:block">🎰</div>
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {filterCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              filter === cat ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((game) => (
          <Link
            key={game.id}
            href={`/casino/${game.id}`}
            className="bg-gray-800 border border-gray-700 rounded-xl p-4 hover:border-purple-500 hover:bg-gray-750 transition-all group cursor-pointer"
          >
            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{game.emoji}</div>
            <h3 className="font-bold text-white text-sm mb-1">{game.name}</h3>
            <p className="text-xs text-gray-400 mb-2">{game.desc}</p>
            <div className="flex gap-1 flex-wrap">
              <span className="bg-gray-700 text-gray-300 text-xs px-2 py-0.5 rounded">{game.category}</span>
              <span className="bg-green-900/50 text-green-400 text-xs px-2 py-0.5 rounded">RTP {game.rtp}</span>
            </div>
            <div className="mt-3 text-xs text-purple-400 font-medium">Jogar →</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
