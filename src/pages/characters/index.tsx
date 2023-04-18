import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import UserAuthContext from "@/store/user-auth";
import { useContext } from "react";

function CharactersPage() {
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const userAuthCtx = useContext(UserAuthContext);
  const onSignOutHandler = () => {
    auth.signOut();
  };

  if (!userAuthCtx.loggedIn) {
    userAuthCtx.setLoggedIn();
    router.push("/");
  }

  return (
    <div>
      <p>Characters</p>
      <button onClick={onSignOutHandler}>Sign out</button>
      {loading && <div>Loading...</div>}
      {!user && <div>Please sign in to continoue</div>}
    </div>
  );
}

export default CharactersPage;
