import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { signToken } from '@/lib/auth';

// In-memory fallback store when DB is unavailable
const memoryUsers: Map<string, { id: string; username: string; password_hash: string; balance: number }> = new Map();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json({ error: 'Username e senha são obrigatórios' }, { status: 400 });
    }
    if (username.length < 3) {
      return NextResponse.json({ error: 'Username deve ter pelo menos 3 caracteres' }, { status: 400 });
    }
    if (password.length < 6) {
      return NextResponse.json({ error: 'Senha deve ter pelo menos 6 caracteres' }, { status: 400 });
    }

    const password_hash = await bcrypt.hash(password, 10);
    const initialBalance = 1000;

    // Try Prisma first, fall back to memory
    let user: { id: string; username: string; balance: number };
    try {
      const { prisma } = await import('@/lib/prisma');
      const created = await prisma.user.create({
        data: { username, password_hash, balance: initialBalance },
      });
      user = { id: created.id, username: created.username, balance: created.balance };
    } catch {
      // DB not available — use memory store
      if (memoryUsers.has(username)) {
        return NextResponse.json({ error: 'Username já existe' }, { status: 409 });
      }
      const id = `mem-${Date.now()}`;
      memoryUsers.set(username, { id, username, password_hash, balance: initialBalance });
      user = { id, username, balance: initialBalance };
    }

    const token = signToken({ userId: user.id, username: user.username });
    return NextResponse.json({ token, user }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erro interno';
    if (message.includes('Unique constraint') || message.includes('unique')) {
      return NextResponse.json({ error: 'Username já existe' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
