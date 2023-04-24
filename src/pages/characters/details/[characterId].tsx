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
  const userAuthCtx = useContext(UserAuthContext);
  const { characterId } = router.query;

  useEffect(() => {
    if (!userAuthCtx.loggedIn) {
      router.push("/");
    }
  }, [userAuthCtx.loggedIn]);

  const onBackHandler = () => {
    router.push("/characters/1");
  };

  if (!userAuthCtx.loggedIn) {
    return <p>404 - Not found</p>;
  }
  return (
    <div className="p-4">
      <p className="p-1">Details</p>
      <p className="p-1">
        <span className="text-slate-700">Name: </span>
        <span>{person.name}</span>
      </p>
      <p className="p-1">
        <span className="text-slate-700">Birth Year: </span>
        <span>{person.birth_year}</span>
      </p>
      <p className="p-1">
        <span className="text-slate-700">Eye color: </span>
        <span>{person.eye_color}</span>
      </p>
      <div className="p-1">
        <span className="text-slate-700">Movies: </span>
        {films.map((film: Films) => (
          <span className="pl-2 pr-2 m-2 border border-" key={film.title}>
            {film.title}
          </span>
        ))}
      </div>
      <p className="p-1">
        <span className="text-slate-700">Gender: </span>
        <span>{person.gender}</span>
      </p>
      <p className="p-1">
        <span className="text-slate-700">Hair color: </span>
        <span>{person.hair_color}</span>
      </p>
      <p className="p-1">
        <span className="text-slate-700">Height: </span>
        <span>{person.height} cm</span>
      </p>
      <p className="p-1">
        <span className="text-slate-700">Mass: </span>
        <span>{person.mass} kg</span>
      </p>
      <p className="p-1">
        <span className="text-slate-700">Skin color: </span>
        <span>{person.skin_color}</span>
      </p>
      <button
        className="mt-2 w-fit inline-block border-2 border-black rounded-lg p-1 active:bg-sky-200"
        onClick={onBackHandler}
      >
        Back
      </button>
    </div>
  );
}

export default CharacterDetails;
