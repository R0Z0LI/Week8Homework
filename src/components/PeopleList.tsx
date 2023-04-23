import { PeopleData } from "@/pages/characters/[pageId]";
import PeopleItem from "./PeopleItem";
import SearcPeople from "./SearchPeople";
import { useEffect, useState } from "react";
import OrderPeople from "./OrderPeople";

const PeopleList: React.FC<{ items: PeopleData[] }> = (props) => {
  const [filteredPeople, setFilteredPeople] = useState<PeopleData[]>(
    props.items
  );
  const handleSearch = (filteredPeople: PeopleData[]) => {
    setFilteredPeople(filteredPeople);
  };

  useEffect(() => {
    setFilteredPeople(props.items);
  }, [props.items]);

  const onOrderChangeHandler = (orderedPeople: PeopleData[]) => {
    setFilteredPeople(orderedPeople);
  };
  return (
    <div>
      <SearcPeople items={props.items} onSearch={handleSearch} />
      <div>
        <ul>
          <OrderPeople
            items={filteredPeople}
            onOrderChange={onOrderChangeHandler}
          />
          {filteredPeople.map((item) => (
            <PeopleItem
              key={item.name}
              id={item.id + 1}
              name={item.name}
              gender={item.gender}
              birth_year={item.birth_year}
              mass={item.mass}
              height={item.height}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PeopleList;
