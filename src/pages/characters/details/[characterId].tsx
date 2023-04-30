import { useRouter } from "next/router";
import UserAuthContext from "@/store/user-auth";
import { useContext, useEffect } from "react";
import axios from "axios";

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
  req: {
    cookies: {
      [key: string]: string;
    };
  };
}

export const getServerSideProps = async (context: Context) => {
  const { characterId } = context.params;
  const token = context.req.cookies.token;
  const authorizationHeader = "Bearer " + token;
  try {
    const res = await axios.get(
      `http://localhost:5000/auth/characters/details/${characterId}`,
      {
        headers: { Authorization: authorizationHeader },
      }
    );
    const person = res.data;
    return {
      props: {
        person: person,
      },
    };
  } catch (error) {
    return {
      props: {
        person: null,
      },
    };
  }
};

function CharacterDetails({ person }: { person: Person; films: Films[] }) {
  const router = useRouter();
  const userAuthCtx = useContext(UserAuthContext);

  const onBackHandler = () => {
    router.push("/characters/1");
  };

  const onSignInHandler = () => {
    router.push("/");
  };

  return (
    <div className="p-4">
      {person !== null && (
        <div>
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
      )}
      {person === null && (
        <div>
          <button
            className="mt-2 w-fit inline-block border-2 border-black rounded-lg p-1 active:bg-sky-200"
            onClick={onSignInHandler}
          >
            Sign in page
          </button>
        </div>
      )}
    </div>
  );
}

export default CharacterDetails;
