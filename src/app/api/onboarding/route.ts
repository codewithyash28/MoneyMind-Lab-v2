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

    const { country, ageRange, goal } = await req.json();

    if (!country || !ageRange || !goal) {
      return NextResponse.json({ error: 'Missing onboarding data' }, { status: 400 });
    }

    const statement = db.prepare(`
      INSERT INTO profiles (user_id, country, age_range, goal, xp)
      VALUES (?, ?, ?, ?, 0)
      ON CONFLICT(user_id) DO UPDATE SET
        country = excluded.country,
        age_range = excluded.age_range,
        goal = excluded.goal
    `);
    statement.run(session.userId, country, ageRange, goal);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
    try {
      const sessionToken = req.cookies.get('session')?.value;
      if (!sessionToken) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }

      const session = await verifySession(sessionToken);
      if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }

      const profile = db.prepare('SELECT * FROM profiles WHERE user_id = ?').get(session.userId);
      return NextResponse.json(profile || { error: 'Profile not found' }, profile ? { status: 200 } : { status: 404 });
    } catch (error: any) {
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  }
