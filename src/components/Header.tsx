'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useBetSlipStore } from '@/store/betSlipStore';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, setUser } = useBetSlipStore();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const formatBalance = (balance: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(balance);

  return (
    <header className="bg-gray-900 border-b border-gray-700 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-1">
            <span className="text-2xl font-black text-[#00ff87]">Bet</span>
            <span className="text-2xl font-black text-white">Study</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-300 hover:text-[#00ff87] font-medium transition-colors">
              Esportes
            </Link>
            <Link href="/casino" className="text-gray-300 hover:text-[#00ff87] font-medium transition-colors">
              Cassino
            </Link>
            <Link href="/casino/live" className="text-gray-300 hover:text-[#00ff87] font-medium transition-colors">
              Cassino Ao Vivo
            </Link>
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-3">
            {user ? (
              <>
                <div className="hidden sm:flex flex-col items-end">
                  <span className="text-xs text-gray-400">{user.username}</span>
                  <span className="text-sm font-bold text-[#00ff87]">{formatBalance(user.balance)}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-medium text-gray-300 border border-gray-600 rounded hover:bg-gray-700 transition-colors"
                >
                  Sair
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="px-4 py-2 text-sm font-medium text-white border border-gray-600 rounded hover:bg-gray-700 transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  className="px-4 py-2 text-sm font-medium text-black bg-[#00ff87] rounded hover:bg-emerald-400 transition-colors"
                >
                  Cadastrar
                </Link>
              </>
            )}

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-gray-400 hover:text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d={mobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 space-y-2 border-t border-gray-700">
            <Link href="/" className="block px-4 py-2 text-gray-300 hover:text-[#00ff87]" onClick={() => setMobileMenuOpen(false)}>
              Esportes
            </Link>
            <Link href="/casino" className="block px-4 py-2 text-gray-300 hover:text-[#00ff87]" onClick={() => setMobileMenuOpen(false)}>
              Cassino
            </Link>
            <Link href="/casino/live" className="block px-4 py-2 text-gray-300 hover:text-[#00ff87]" onClick={() => setMobileMenuOpen(false)}>
              Cassino Ao Vivo
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
