import {
  initializeApp,
  getApps,
  getApp,
  applicationDefault,
} from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

import type { App } from "firebase-admin/app";
import type { Auth } from "firebase-admin/auth";
import type { Firestore } from "firebase-admin/firestore";

let app: App;
let auth: Auth;
let restApiSignInUrl = "";
let db: Firestore;

if (process.env.NODE_ENV === "development") {
  app =
    getApps().length === 0
      ? initializeApp({ projectId: "demo-storeit-f04dd" })
      : getApp();
  restApiSignInUrl = `http://localhost:9099/identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=123`;
} else {
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS === undefined) {
    throw Error("Missing GOOGLE_APPLICATION_CREDENTIALS");
  }

  if (process.env.FIREBASE_WEB_API_KEY === undefined) {
    throw Error("Missing FIREBASE_WEB_API_KEY");
  }
  app =
    getApps().length === 0
      ? initializeApp({
          credential: applicationDefault(),
        })
      : getApp();
  restApiSignInUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_WEB_API_KEY}`;
}

auth = getAuth(app);
db = getFirestore(app);

export { app, auth, db, restApiSignInUrl };
