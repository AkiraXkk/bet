import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { signToken } from '@/lib/auth';

// Shared in-memory store (same module singleton)
const memoryUsers: Map<string, { id: string; username: string; password_hash: string; balance: number }> = new Map();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json({ error: 'Username e senha são obrigatórios' }, { status: 400 });
    }

    let dbUser: { id: string; username: string; password_hash: string; balance: number } | null = null;

    try {
      const { prisma } = await import('@/lib/prisma');
      dbUser = await prisma.user.findUnique({ where: { username } });
    } catch {
      dbUser = memoryUsers.get(username) || null;
    }

    if (!dbUser) {
      return NextResponse.json({ error: 'Credenciais inválidas' }, { status: 401 });
    }

    const valid = await bcrypt.compare(password, dbUser.password_hash);
    if (!valid) {
      return NextResponse.json({ error: 'Credenciais inválidas' }, { status: 401 });
    }

    const token = signToken({ userId: dbUser.id, username: dbUser.username });
    const user = { id: dbUser.id, username: dbUser.username, balance: dbUser.balance };
    return NextResponse.json({ token, user });
  } catch {
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
