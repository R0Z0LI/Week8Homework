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
function HomePage() {
  const app = initFirebase();
  const [clicked, setClicked] = useState(false);
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const [successfulRegistration, setSuccessfulRegistration] = useState(false);
  const router = useRouter();
  const userAuthCtx = useContext(UserAuthContext);

  if (!userAuthCtx) {
    throw new Error("UserAuthContext not found");
  }

  if (userAuthCtx.loggedIn) {
    router.push("/characters/1");
  }

  const onClickHandler = () => {
    if (clicked) {
      setClicked(false);
    } else {
      setClicked(true);
    }
  };

  const onSubmitHandler = (email: string, password: string) => {
    if (clicked) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          setSuccessfulRegistration(true);
          setTimeout(() => {
            setSuccessfulRegistration(false);
          }, 3000);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;

          userAuthCtx.setLoggedIn(true);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    }
  };

  return (
    <div>
      <div className="pt-3 pl-4">
        {clicked ? <p>Registration</p> : <p>Signing in</p>}
      </div>
      <Authentication onSubmit={onSubmitHandler} />
      {successfulRegistration && (
        <p className="pl-4 p-1 text-red-600">Successful Registration</p>
      )}
      {loading && <div>Loading...</div>}
      <div className="w-fit inline-block border-2 border-black rounded-lg ml-4 p-1 active:bg-sky-200">
        {clicked && <button onClick={onClickHandler}>Sign In</button>}
        {!clicked && <button onClick={onClickHandler}>Create Account</button>}
      </div>
    </div>
  );
}
export default HomePage;
