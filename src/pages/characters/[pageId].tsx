import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import { NextPageContext } from "next";
import UserAuthContext from "@/store/user-auth";
import { initFirebase } from "@/firebase/Authentication";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import PeopleList from "@/components/PeopleList";
import { Pagination } from "@mui/material";
import axios from "axios";
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
  req: {
    cookies: {
      [key: string]: string;
    };
  };
}

export const getServerSideProps = async (context: Context) => {
  const { pageId } = context.query;
  const token = context.req.cookies.token;
  const authorizationHeader = "Bearer " + token;
  try {
    const res = await axios.get(
      `http://localhost:5000/auth/characters/${pageId}`,
      {
        headers: { Authorization: authorizationHeader },
      }
    );
    const data = res.data;
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
  } catch (error) {
    return {
      props: {
        people: [],
        pageId: Number(pageId),
      },
    };
  }
};

function CharactersPage({
  people,
  pageId,
}: {
  people: PeopleData[];
  pageId: number;
}) {
  const [currentPage, setCurrentPage] = useState(pageId);
  const router = useRouter();
  const userAuthCtx = useContext(UserAuthContext);
  const [loading, setLoading] = useState(false);
  const [detailsLoading, setDetailsLoading] = useState(false);

  const onSignInHandler = () => {
    router.push("/");
  };

  useEffect(() => {
    setLoading(false);
  }, [people, detailsLoading]);

  useEffect(() => {
    if (userAuthCtx.loggedIn) {
    }
  }, [userAuthCtx.loggedIn]);

  const onChange = (event: ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
    setLoading(true);
    router.push(`/characters/${page}`);
  };

  const onSignOutHandler = () => {
    userAuthCtx.setLoggedIn(false);
    router.push("/");
  };

  const onLoadingChangeHandler = (loading: boolean) => {
    setDetailsLoading(loading);
  };

  return (
    <div>
      {people.length !== 0 && (
        <div>
          {(!loading || !detailsLoading) && (
            <button
              className="m-2 w-fit inline-block border-2 border-black rounded-lg ml-4 p-1 active:bg-sky-200"
              onClick={onSignOutHandler}
            >
              Sign out
            </button>
          )}
          {(!loading || !detailsLoading) && people && (
            <PeopleList
              items={people}
              onLoadingChange={onLoadingChangeHandler}
            />
          )}
          {(!loading || !detailsLoading) && (
            <Pagination
              count={9}
              className="flex justify-center p-2"
              page={pageId}
              onChange={onChange}
            />
          )}
          {loading && <div className="p-2">Loading...</div>}
        </div>
      )}
      {people.length === 0 && (
        <div>
          <p className="p-2">Please log in</p>
          <button
            className="m-2  w-fit inline-block border-2 border-black rounded-lg p-1 active:bg-sky-200"
            onClick={onSignInHandler}
          >
            Sign in page
          </button>
        </div>
      )}
    </div>
  );
}

export default CharactersPage;
