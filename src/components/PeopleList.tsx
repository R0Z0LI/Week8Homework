import { PeopleData } from "@/pages/characters";
import PeopleItem from "./PeopleItem";

const PeopleList: React.FC<{ items: PeopleData[] }> = (props) => {
  return (
    <ul>
      {props.items.map((item) => (
        <PeopleItem
          key={item.name}
          id={item.id + 1}
          name={item.name}
          gender={item.gender}
          birth_year={item.birth_year}
        />
      ))}
    </ul>
  );
};

export default PeopleList;
