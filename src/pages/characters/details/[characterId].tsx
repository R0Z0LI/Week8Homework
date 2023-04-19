import { useRouter } from "next/router";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import UserAuthContext from "@/store/user-auth";
import { initFirebase } from "@/firebase/Authentication";
import { useContext, useEffect } from "react";
import { GetServerSideProps } from "next";

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

interface Films {
  characters: string[];
  created: string;
  director: string;
  edited: string;
  episode_id: number;
  planets: string[];
  producer: string;
  release_date: string;
  species: string[];
  starships: string[];
  title: string;
  url: string;
  vehicles: string[];
}

interface Context {
  params: {
    characterId: string;
  };
}

export const getServerSideProps = async (context: Context) => {
  const { characterId } = context.params;
  console.log("charId", characterId);
  const res = await fetch(`https://swapi.dev/api/people/${characterId}`);
  const person: Person = await res.json();
  const filmsAPI = person.films;
  let films: Films[] = [];
  for (let i = 0; i < filmsAPI.length; i++) {
    const filmRes = await fetch(filmsAPI[i]);
    const film: Films = await filmRes.json();
    films = [film, ...films];
  }
  return {
    props: {
      person,
      films,
    },
  };
  revalidate: 1;
};

function CharacterDetails({
  person,
  films,
}: {
  person: Person;
  films: Films[];
}) {
  const router = useRouter();
  const app = initFirebase();
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const userAuthCtx = useContext(UserAuthContext);
  const { characterId } = router.query;

  useEffect(() => {
    if (!userAuthCtx.loggedIn) {
      router.push("/");
    }
  }, [userAuthCtx.loggedIn]);

  if (!userAuthCtx.loggedIn) {
    return <p>404 - Not found</p>;
  }
  return (
    <div>
      <p>Details</p>
      <p>{person.name}</p>
      <p>{person.birth_year}</p>
      <p>{person.eye_color}</p>
      {films.map((film: Films) => (
        <p key={film.title}>{film.title}</p>
      ))}
      <p>{person.gender}</p>
      <p>{person.hair_color}</p>
      <p>{person.height}</p>
      <p>{person.mass}</p>
      <p>{person.skin_color}</p>
    </div>
  );
}

export default CharacterDetails;
