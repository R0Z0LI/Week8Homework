import Authentication from "@/components/AuthenticationForm";
import { initFirebase } from "@/firebase/Authentication";
import { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";

function HomePage() {
  const [clicked, setClicked] = useState(false);
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (user) {
    router.push("/characters");
    return <div>Welcome {user.displayName}</div>;
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
      createUserWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          const user = userCredential.user;
        }
      );
    } else {
      signInWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          const user = userCredential.user;
          console.log(user.uid);
        }
      );
    }
  };

  const app = initFirebase();
  return (
    <div>
      {clicked ? <p>Register</p> : <p>Sign in</p>}
      <Authentication onSubmit={onSubmitHandler} />

      {clicked && <button onClick={onClickHandler}>Sign In</button>}
      {!clicked && <button onClick={onClickHandler}>Create Account</button>}
    </div>
  );
}
export default HomePage;
