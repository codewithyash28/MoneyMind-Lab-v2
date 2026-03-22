import db from '@/lib/db';

export async function addProgress(userId: number, moduleType: string, moduleId: string, score: number) {
  try {
    const statement = db.prepare(`
      INSERT INTO progress (user_id, module_type, module_id, score)
      VALUES (?, ?, ?, ?)
    `);
    statement.run(userId, moduleType, moduleId, score);

    const updateXp = db.prepare('UPDATE profiles SET xp = xp + ? WHERE user_id = ?');
    updateXp.run(score, userId);

    return true;
  } catch (error) {
    console.error('Failed to add progress:', error);
    return false;
  }
}

export async function getUserXp(userId: number) {
  try {
    const profile: any = db.prepare('SELECT xp FROM profiles WHERE user_id = ?').get(userId);
    return profile?.xp || 0;
  } catch (error) {
    console.error('Failed to get user XP:', error);
    return 0;
  }
}
