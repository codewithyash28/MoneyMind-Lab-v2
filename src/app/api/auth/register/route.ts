import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { hashPassword, createSession } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Missing email or password' }, { status: 400 });
    }

    const hashedPassword = await hashPassword(password);

    const statement = db.prepare('INSERT INTO users (email, password) VALUES (?, ?)');
    const result = statement.run(email, hashedPassword);
    const userId = result.lastInsertRowid as number;

    const token = await createSession(userId);

    const response = NextResponse.json({ success: true, userId });
    response.cookies.set('session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });

    return response;
  } catch (error: any) {
    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return NextResponse.json({ error: 'Email already exists' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
