import { database } from "firebase-admin";
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getDatabase } from "firebase-admin/database";
import { getFirestore } from "firebase-admin/firestore";

// Load service account credentials from environment variables
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY || "{}");

let app;
if (!getApps().length) {
  app = initializeApp({
    credential: cert(serviceAccount),
    databaseURL: "https://smart-flood-development-default-rtdb.firebaseio.com"
  });
} else {
  app = getApps()[0];
}

// Export the Firebase Admin SDK services you need
export const adminAuth = getAuth(app);
export const adminDB = getFirestore(app);
adminDB.settings({ignoreUndefinedProperties: true})
export const adminRTDB = getDatabase(app);