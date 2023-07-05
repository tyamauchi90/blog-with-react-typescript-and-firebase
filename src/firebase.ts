import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBGPBtnqzeydSwY6XUD5jsqrxYZq3HMA90",
  authDomain: "blog-with-react-and-fire-97078.firebaseapp.com",
  projectId: "blog-with-react-and-fire-97078",
  storageBucket: "blog-with-react-and-fire-97078.appspot.com",
  messagingSenderId: "437714546107",
  appId: "1:437714546107:web:adc2fd8fe5933f0090689e"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);//初期化
const provider = new GoogleAuthProvider();//インスタンス化
const db = getFirestore(app);

export { auth, provider, db };