import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter, withRouter } from "next/router";
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
}

interface Person {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
}

interface Context {
  params: {
    page: number;
  };
}

export const getServerSideProps = async (context: Context) => {
  console.log("page", context.params.page);
  const page = context.params || "1";
  const res = await fetch(`https://swapi.dev/api/people/?page=1`);
  const data = await res.json();
  const people = await data.results.map(
    (person: PeopleData, index: number) => ({
      id: index,
      name: person.name,
      gender: person.gender,
      birth_year: person.birth_year,
    })
  );
  return {
    props: {
      people: JSON.parse(JSON.stringify(people)),
      page: Number(page),
    },
  };
  revalidate: 1;
};

function CharactersPage({
  people,
  page,
}: {
  people: PeopleData[];
  page: number;
}) {
  const app = initFirebase();
  const auth = getAuth();
  const [currentPage, setCurrentPage] = useState(page);
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const userAuthCtx = useContext(UserAuthContext);

  const onChange = (event: ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
    router.push(`/characters/?page=${page}`);
  };

  const onSignOutHandler = () => {
    auth.signOut();
    userAuthCtx.setLoggedIn(false);
    router.push("/");
  };

  if (!userAuthCtx.loggedIn) {
    if (typeof window === "undefined") return null;
    router.push("/");
  }

  return (
    <div>
      <PeopleList items={people} />
      {loading && <div>Loading...</div>}
      <Pagination count={10} page={currentPage} onChange={onChange} />
      <button onClick={onSignOutHandler}>Sign out</button>
    </div>
  );
}

export default CharactersPage;
