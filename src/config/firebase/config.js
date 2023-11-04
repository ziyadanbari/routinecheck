import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY_FIREBASE,
  authDomain: "rocheck-d1c42.firebaseapp.com",
  projectId: "rocheck-d1c42",
  storageBucket: "rocheck-d1c42.appspot.com",
  messagingSenderId: "82837038173",
  appId: "1:82837038173:web:f804fea556d331c4c819b4",
};
const app = initializeApp(firebaseConfig);
const authentication = getAuth(app);
export { authentication };
