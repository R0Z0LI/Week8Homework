import { PeopleData } from "@/pages/characters/[pageId]";
import PeopleItem from "./PeopleItem";
import SearcPeople from "./SearchPeople";
import { useState } from "react";

const PeopleList: React.FC<{ items: PeopleData[] }> = (props) => {
  const [filteredPeople, setFilteredPeople] = useState<PeopleData[]>(
    props.items
  );
  const handleSearch = (filteredPeople: PeopleData[]) => {
    setFilteredPeople(filteredPeople);
  };
  console.log(filteredPeople);
  return (
    <div>
      <SearcPeople items={props.items} onSearch={handleSearch} />
      <ul>
        <li>
          <span>Id </span>
          <span>Name </span>
          <span>Gender </span>
          <span>Birth Year</span>
        </li>
        {filteredPeople.map((item) => (
          <PeopleItem
            key={item.name}
            id={item.id + 1}
            name={item.name}
            gender={item.gender}
            birth_year={item.birth_year}
          />
        ))}
      </ul>
    </div>
  );
};

export default PeopleList;
