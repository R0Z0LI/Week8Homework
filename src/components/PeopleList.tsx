import { PeopleData } from "@/pages/characters/[pageId]";
import PeopleItem from "./PeopleItem";
import SearcPeople from "./SearchPeople";
import { useEffect, useState } from "react";
import OrderPeople from "./OrderPeople";

const PeopleList: React.FC<{
  items: PeopleData[];
  onLoadingChange: (loading: boolean) => void;
}> = (props) => {
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
  const onLoadingChangeHandler = (loading: boolean) => {
    props.onLoadingChange(loading);
  };
  return (
    <div>
      <SearcPeople items={props.items} onSearch={handleSearch} />
      <div className="p-2">
        <ul className="border-2 border-black">
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
              onLoadingChange={onLoadingChangeHandler}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PeopleList;
