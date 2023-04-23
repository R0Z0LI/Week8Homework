import { useRouter } from "next/router";

const PeopleItem: React.FC<{
  id: number;
  name: string;
  gender: string;
  birth_year: string;
  mass: string;
  height: string;
}> = (props) => {
  const router = useRouter();
  const onClickHandler = () => {
    router.push(`/characters/details/${props.id}`);
  };
  return (
    <li
      className="p-3 grid gap-4 grid-cols-6 border-2 border-black"
      onClick={onClickHandler}
    >
      <span className="p-1 pr-10 text-">{props.id} </span>
      <span className="p-1 w-40">{props.name} </span>
      <span className="p-1 w-20">{props.gender} </span>
      <span className="p-1">{props.birth_year} </span>
      <span className="p-1">{props.mass} </span>
      <span className="p-1">{props.height} </span>
    </li>
  );
};

export default PeopleItem;
