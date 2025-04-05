import * as admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: "http://localhost:9000/?ns=your-project-id",
  });
}

const auth = admin.auth();
const db = admin.firestore(); // or admin.database() for RTDB

export { auth, db };
