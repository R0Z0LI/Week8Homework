import { PeopleData } from "@/pages/characters/[pageId]";
import PeopleItem from "./PeopleItem";

const PeopleList: React.FC<{ items: PeopleData[] }> = (props) => {
  return (
    <ul>
      <li>
        <span>Id </span>
        <span>Name </span>
        <span>Gender </span>
        <span>Birth Year</span>
      </li>
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
