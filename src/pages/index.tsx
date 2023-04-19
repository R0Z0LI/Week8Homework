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
  const router = useRouter();
  const userAuthCtx = useContext(UserAuthContext);

  if (!userAuthCtx) {
    throw new Error("UserAuthContext not found");
  }

  if (userAuthCtx.loggedIn) {
    router.push("/characters");
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
          //userAuthCtx.setLoggedIn(true);
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
      {clicked ? <p>Register</p> : <p>Sign in</p>}
      <Authentication onSubmit={onSubmitHandler} />
      {loading && <div>Loading...</div>}
      {clicked && <button onClick={onClickHandler}>Sign In</button>}
      {!clicked && <button onClick={onClickHandler}>Create Account</button>}
    </div>
  );
}
export default HomePage;
