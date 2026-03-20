export default function SportsBanner() {
  return (
    <div className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-xl p-8 mb-6 overflow-hidden border border-gray-700">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #00ff87 0%, transparent 50%), radial-gradient(circle at 80% 50%, #0066ff 0%, transparent 50%)' }} />
      <div className="relative z-10">
        <div className="inline-block bg-[#00ff87]/10 border border-[#00ff87]/30 rounded-full px-3 py-1 text-xs text-[#00ff87] font-medium mb-3">
          🎯 Apostas Fictícias para Estudo
        </div>
        <h1 className="text-3xl font-black text-white mb-2">Bem-vindo ao BetStudy</h1>
        <p className="text-gray-400 max-w-xl">Explore o mundo das apostas de forma segura e educacional. Dinheiro fictício, experiência real.</p>
        <div className="flex gap-4 mt-4 text-sm">
          <div className="bg-gray-800/80 rounded-lg px-3 py-2">
            <span className="text-gray-400">Saldo Inicial: </span>
            <span className="text-[#00ff87] font-bold">R$ 1.000,00</span>
          </div>
          <div className="bg-gray-800/80 rounded-lg px-3 py-2">
            <span className="text-gray-400">Eventos: </span>
            <span className="text-white font-bold">20+ Disponíveis</span>
          </div>
          <div className="bg-gray-800/80 rounded-lg px-3 py-2">
            <span className="text-gray-400">Modo: </span>
            <span className="text-white font-bold">📚 Estudo</span>
          </div>
        </div>
      </div>
      <div className="absolute right-8 top-1/2 -translate-y-1/2 text-8xl opacity-20 hidden lg:block">🚀</div>
    </div>
  );
}
