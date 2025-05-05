import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT || '{}';

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(serviceAccount) as admin.ServiceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

export const db = admin.firestore();