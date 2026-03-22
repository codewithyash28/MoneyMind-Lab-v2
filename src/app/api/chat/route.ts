import { NextRequest, NextResponse } from 'next/server';
import { getGeminiResponse } from '@/lib/gemini';
import { verifySession } from '@/lib/auth';
import db from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const sessionToken = req.cookies.get('session')?.value;
    if (!sessionToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const session = await verifySession(sessionToken);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { message } = await req.json();

    const profile: any = db.prepare('SELECT country, goal FROM profiles WHERE user_id = ?').get(session.userId);

    const response = await getGeminiResponse(message, profile || { country: 'Default', goal: 'Learn' });

    // Track progress (chatting)
    db.prepare(`
      INSERT INTO progress (user_id, module_type, module_id, score)
      VALUES (?, 'chat', ?, 10)
    `).run(session.userId, 'chat-session');

    // Update XP
    db.prepare('UPDATE profiles SET xp = xp + 10 WHERE user_id = ?').run(session.userId);

    return NextResponse.json({ response });
  } catch (error: any) {
    console.error("Chat API Error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
