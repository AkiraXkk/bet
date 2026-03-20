import Link from 'next/link';

const liveGames = [
  { id: 'live-blackjack', name: 'Blackjack Ao Vivo', emoji: '🃏', players: 127, dealer: 'Sofia M.' },
  { id: 'live-roulette', name: 'Roleta Ao Vivo', emoji: '🎡', players: 342, dealer: 'Carlos R.' },
  { id: 'live-baccarat', name: 'Bacará Ao Vivo', emoji: '💎', players: 89, dealer: 'Ana P.' },
  { id: 'live-poker', name: 'Pôquer Ao Vivo', emoji: '♠️', players: 56, dealer: 'Miguel S.' },
];

export default function LiveCasinoPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-gradient-to-r from-red-900 via-gray-800 to-gray-900 rounded-xl p-8 mb-6 border border-gray-700">
        <div className="inline-block bg-red-500/10 border border-red-500/30 rounded-full px-3 py-1 text-xs text-red-400 font-medium mb-3">
          🔴 AO VIVO
        </div>
        <h1 className="text-3xl font-black text-white mb-2">Cassino Ao Vivo</h1>
        <p className="text-gray-400">Jogue com dealers reais em tempo real. Totalmente simulado para fins educacionais.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {liveGames.map((game) => (
          <Link
            key={game.id}
            href={`/casino/${game.id}`}
            className="bg-gray-800 border border-gray-700 rounded-xl p-5 hover:border-red-500 transition-all group"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-3xl">{game.emoji}</span>
              <span className="flex items-center gap-1 text-xs text-red-400 font-medium">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                AO VIVO
              </span>
            </div>
            <h3 className="font-bold text-white mb-1">{game.name}</h3>
            <p className="text-xs text-gray-400">Dealer: {game.dealer}</p>
            <p className="text-xs text-gray-500 mt-1">{game.players} jogadores</p>
            <div className="mt-3 text-xs text-red-400 font-medium group-hover:text-red-300">Entrar →</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
