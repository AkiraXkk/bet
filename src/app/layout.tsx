import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import BetSlip from '@/components/BetSlip';

export const metadata: Metadata = {
  title: 'BetStudy - Apostas Fictícias para Estudo',
  description: 'Plataforma educacional de apostas com dinheiro fictício. Apenas para fins de estudo.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-[#0f0f0f] text-white min-h-screen">
        <Header />
        <main>{children}</main>
        <BetSlip />
      </body>
    </html>
  );
}
