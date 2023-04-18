import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAUlhDwIIqRDtm6M58A1MCEYtWLGqEH-_g",
  authDomain: "star-wars-auth-9e636.firebaseapp.com",
  projectId: "star-wars-auth-9e636",
  storageBucket: "star-wars-auth-9e636.appspot.com",
  messagingSenderId: "919005518012",
  appId: "1:919005518012:web:53c1ab4094b6f65f8458b9",
  measurementId: "G-R4P59R1LB5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
