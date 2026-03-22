import db from '../src/lib/db';
import { hashPassword, verifyPassword, createSession, verifySession } from '../src/lib/auth';

async function runTest() {
  console.log('Testing Database and Authentication...');

  try {
    // 1. Test Database
    console.log('--- Testing Database ---');
    const tableCheck = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='users'").get();
    if (tableCheck) {
      console.log('✅ Users table exists.');
    } else {
      throw new Error('❌ Users table missing.');
    }

    // 2. Test Password Hashing
    console.log('--- Testing Password Hashing ---');
    const password = 'testpassword123';
    const hash = await hashPassword(password);
    const isValid = await verifyPassword(password, hash);
    if (isValid) {
      console.log('✅ Password hashing and verification working.');
    } else {
      throw new Error('❌ Password verification failed.');
    }

    // 3. Test JWT Sessions
    console.log('--- Testing JWT Sessions ---');
    const userId = 42;
    const token = await createSession(userId);
    const payload = await verifySession(token);
    if (payload && payload.userId === userId) {
      console.log('✅ JWT creation and verification working.');
    } else {
      throw new Error('❌ JWT verification failed.');
    }

    console.log('\nAll tests passed successfully! 🚀');
  } catch (error) {
    console.error('Test failed:', error);
    process.exit(1);
  }
}

runTest();
