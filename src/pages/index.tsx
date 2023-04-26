import Authentication from "@/components/AuthenticationForm";
import { initFirebase } from "@/firebase/Authentication";
import { useContext, useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import UserAuthContext from "@/store/user-auth";
import axios from "axios";
function HomePage() {
  const app = initFirebase();
  const [clicked, setClicked] = useState(false);
  const auth = getAuth();
  const [loading, setLoading] = useState(false);
  const [successfulRegistration, setSuccessfulRegistration] = useState(false);
  const router = useRouter();
  const userAuthCtx = useContext(UserAuthContext);

  if (!userAuthCtx) {
    throw new Error("UserAuthContext not found");
  }

  useEffect(() => {
    if (userAuthCtx.loggedIn) {
      router.push("/characters/1");
      setLoading(true);
    }
  }, [userAuthCtx.loggedIn]);

  const onClickHandler = () => {
    if (clicked) {
      setClicked(false);
    } else {
      setClicked(true);
    }
  };

  const onSubmitHandler = (email: string, password: string) => {
    if (clicked) {
      const user = createAccount(email, password);
    } else {
      login(email, password);
    }
  };

  const createAccount = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/createAccount",
        {
          email,
          password,
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return (
    <div>
      {!loading && (
        <div className="pt-3 pl-4">
          {clicked ? <p>Registration</p> : <p>Signing in</p>}
        </div>
      )}
      {!loading && <Authentication onSubmit={onSubmitHandler} />}
      {successfulRegistration && !loading && (
        <p className="pl-4 p-1 text-red-600">Successful Registration</p>
      )}
      {loading && <div className="p-2">Loading...</div>}
      {!loading && (
        <div className="w-fit inline-block border-2 border-black rounded-lg ml-4 p-1 active:bg-sky-200">
          {clicked && <button onClick={onClickHandler}>Sign In</button>}
          {!clicked && <button onClick={onClickHandler}>Create Account</button>}
        </div>
      )}
    </div>
  );
}
export default HomePage;
