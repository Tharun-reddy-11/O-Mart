// Example: /lib/firebase.ts using Firebase Admin SDK
import admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      // Use replace to properly format multi-line private keys
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET, // e.g., "your-project.appspot.com"
  });
}

// Export the admin storage instance
const storage = admin.storage();
export default storage;
