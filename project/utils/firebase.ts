import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "fake-api-key",
  authDomain: "localhost",
  projectId: "demo-project",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
