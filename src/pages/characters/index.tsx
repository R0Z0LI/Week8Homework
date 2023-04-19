import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter, withRouter } from "next/router";
import UserAuthContext from "@/store/user-auth";
import { initFirebase } from "@/firebase/Authentication";
import { useContext } from "react";
import PeopleList from "@/components/PeopleList";
import axios from "axios";

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

/*function getAllStarwarsPeople() {
  let people: Person[] = [];

  return axios("https://swapi.co/api/people/")
    .then((response) => {
      people = response.data.results;
      return response.data.count;
    })
    .then((count) => {
      const numberOfPagesLeft = Math.ceil((count - 1) / 10);
      let promises = [];

      for (let i = 2; i <= numberOfPagesLeft; i++) {
        promises.push(axios(`https://swapi.co/api/people?page=${i}`));
      }
      return Promise.all(promises);
    })
    .then((response) => {
      people = response.reduce(
        (acc, data) => [...acc, ...data.data.results],
        people
      );
      return people;
    })
    .catch((error) => {
      console.log("Properly handle your exception here");
      return [];
    });
}*/

export async function getServerSideProps() {
  /*const starwarsPeopls = await getAllStarwarsPeople();
  console.log("starwarsPeopls", starwarsPeopls);
  if (!starwarsPeopls) {
    return { props: { people: [] } };
  }
  const people = starwarsPeopls.map((person, index: number) => ({
    id: index,
    name: person.name,
    gender: person.gender,
    birth_year: person.birth_year,
  }));

  return {
    props: {
      people: JSON.parse(JSON.stringify(people)),
    },
  };*/
  const res = await fetch("https://swapi.dev/api/people");
  const data = await res.json();
  const people = data.results.map((person: PeopleData, index: number) => ({
    id: index,
    name: person.name,
    gender: person.gender,
    birth_year: person.birth_year,
  }));
  return {
    props: {
      people: JSON.parse(JSON.stringify(people)),
    },
  };
  revalidate: 1;
}

function CharactersPage({ people }: { people: PeopleData[] }) {
  const app = initFirebase();
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const userAuthCtx = useContext(UserAuthContext);
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
      <p>Characters</p>
      <button onClick={onSignOutHandler}>Sign out</button>
      <PeopleList items={people} />
      {loading && <div>Loading...</div>}
    </div>
  );
}

export default CharactersPage;
