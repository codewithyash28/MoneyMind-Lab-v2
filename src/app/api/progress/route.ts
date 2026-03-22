import { NextRequest, NextResponse } from 'next/server';
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

    const { moduleType, moduleId, xp } = await req.json();

    // Track progress
    db.prepare(`
      INSERT INTO progress (user_id, module_type, module_id, score)
      VALUES (?, ?, ?, ?)
    `).run(session.userId, moduleType, moduleId, xp);

    // Update XP
    db.prepare('UPDATE profiles SET xp = xp + ? WHERE user_id = ?').run(xp, session.userId);

    return NextResponse.json({ success: true, newXp: (db.prepare('SELECT xp FROM profiles WHERE user_id = ?').get(session.userId) as any).xp });
  } catch (error: any) {
    console.error("Progress API Error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
