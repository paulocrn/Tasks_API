import admin from 'firebase-admin';
import dotenv from 'dotenv';
import serviceAccount from '../config/firebase_json.json';

dotenv.config();


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

export const db = admin.firestore();