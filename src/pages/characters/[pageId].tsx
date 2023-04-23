import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import UserAuthContext from "@/store/user-auth";
import { initFirebase } from "@/firebase/Authentication";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import PeopleList from "@/components/PeopleList";
import { Pagination } from "@mui/material";
export interface PeopleData {
  id: number;
  name: string;
  gender: string;
  birth_year: string;
  mass: string;
  height: string;
}

interface Context {
  query: {
    pageId: string;
  };
}

export const getServerSideProps = async (context: Context) => {
  const { pageId } = context.query;
  const res = await fetch(`https://swapi.dev/api/people/?page=${pageId}`);
  const data = await res.json();
  const people = await data.results.map(
    (person: PeopleData, index: number) => ({
      id: +pageId * 10 - 10 + index,
      name: person.name,
      gender: person.gender,
      birth_year: person.birth_year,
      mass: person.mass,
      height: person.height,
    })
  );
  return {
    props: {
      people: JSON.parse(JSON.stringify(people)),
      pageId: Number(pageId),
    },
  };
  revalidate: 1;
};

function CharactersPage({
  people,
  pageId,
}: {
  people: PeopleData[];
  pageId: number;
}) {
  const app = initFirebase();
  const auth = getAuth();
  const [currentPage, setCurrentPage] = useState(pageId);
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const userAuthCtx = useContext(UserAuthContext);

  useEffect(() => {
    if (!userAuthCtx.loggedIn) {
      router.push("/");
    }
  }, [userAuthCtx.loggedIn]);

  const onChange = (event: ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
    router.push(`/characters/${page}`);
  };

  const onSignOutHandler = () => {
    auth.signOut();
    userAuthCtx.setLoggedIn(false);
    router.push("/");
  };

  return (
    <div>
      <button
        className="m-2 w-fit inline-block border-2 border-black rounded-lg ml-4 p-1 active:bg-sky-200"
        onClick={onSignOutHandler}
      >
        Sign out
      </button>
      {people && <PeopleList items={people} />}
      {loading && <div>Loading...</div>}
      <Pagination
        count={9}
        className="flex justify-center p-2"
        page={pageId}
        onChange={onChange}
      />
    </div>
  );
}

export default CharactersPage;
