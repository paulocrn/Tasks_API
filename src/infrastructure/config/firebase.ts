import admin from 'firebase-admin';
import dotenv from 'dotenv';
//import serviceAccount from '../config/firebase_json.json';

dotenv.config();

//const serviceAccount = JSON.parse(process.env.FIREBASE_ACCOUNT || '');

//var serviceAccount = require("../config/firebase_json.json");

admin.initializeApp({
  credential: admin.credential.cert({
    "projectId": process.env.FIREBASE_PROJECT_ID,
    "privateKey": (process.env.FIREBASE_PRIVATE_KEY ?? '').replace(/\\n/g, '\n'),
    "clientEmail": process.env.FIREBASE_CLIENT_EMAIL
  }),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

export const db = admin.firestore();