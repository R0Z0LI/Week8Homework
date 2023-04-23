import { PeopleData } from "@/pages/characters/[pageId]";
import { ChangeEvent } from "react";
import { useState } from "react";
import { debounce } from "@mui/material";

const SearcPeople: React.FC<{
  items: PeopleData[];
  onSearch: (filteredPeople: PeopleData[]) => void;
}> = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<PeopleData[]>([]);

  const debouncedSearch = debounce(async (searchTerm: string) => {
    const res = await fetch(
      `https://swapi.dev/api/people/?search=${searchTerm}`
    );
    const data = await res.json();
    const results = data.results.map((person: PeopleData) => ({
      id: person.id,
      name: person.name,
      gender: person.gender,
      birth_year: person.birth_year,
      mass: person.mass,
      height: person.height,
    }));
    setSearchResults(results);
    props.onSearch(results);
  }, 500);

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    debouncedSearch(searchTerm);
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Search.."
        className="py-2 pl-2 ml-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        onChange={onChangeHandler}
      />
    </div>
  );
};

export default SearcPeople;
