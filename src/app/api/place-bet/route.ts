import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

// In-memory fallback
const memoryBalances: Map<string, number> = new Map();
const memoryBets: Array<{ id: string; userId: string; eventId: string; amount: number; status: string; potential_payout: number; selectedOdd: number }> = [];

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const token = authHeader.slice(7);
    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
    }

    const body = await request.json();
    const { eventId, amount, odds } = body;

    if (!eventId || !amount || !odds || amount <= 0) {
      return NextResponse.json({ error: 'Dados inválidos' }, { status: 400 });
    }

    const potential_payout = parseFloat((amount * odds).toFixed(2));

    try {
      const { prisma } = await import('@/lib/prisma');
      const user = await prisma.user.findUnique({ where: { id: payload.userId } });
      if (!user) return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
      if (user.balance < amount) return NextResponse.json({ error: 'Saldo insuficiente' }, { status: 400 });

      const [updatedUser, bet] = await prisma.$transaction([
        prisma.user.update({ where: { id: payload.userId }, data: { balance: { decrement: amount } } }),
        prisma.bet.create({
          data: { userId: payload.userId, eventId, amount, status: 'Pending', potential_payout, selectedOdd: odds },
        }),
      ]);
      return NextResponse.json({ success: true, newBalance: updatedUser.balance, betId: bet.id });
    } catch {
      // Memory fallback
      const currentBalance = memoryBalances.get(payload.userId) ?? 1000;
      if (currentBalance < amount) return NextResponse.json({ error: 'Saldo insuficiente' }, { status: 400 });
      const newBalance = parseFloat((currentBalance - amount).toFixed(2));
      memoryBalances.set(payload.userId, newBalance);
      const betId = `bet-${Date.now()}`;
      memoryBets.push({ id: betId, userId: payload.userId, eventId, amount, status: 'Pending', potential_payout, selectedOdd: odds });
      return NextResponse.json({ success: true, newBalance, betId });
    }
  } catch {
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
