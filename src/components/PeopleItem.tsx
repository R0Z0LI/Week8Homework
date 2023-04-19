import { useRouter } from "next/router";

const PeopleItem: React.FC<{
  id: number;
  name: string;
  gender: string;
  birth_year: string;
}> = (props) => {
  const router = useRouter();
  const onClickHandler = () => {
    router.push(`/characters/details/${props.id}`);
  };
  return (
    <li onClick={onClickHandler}>
      <span>{props.id} </span>
      <span>{props.name} </span>
      <span>{props.gender} </span>
      <span>{props.birth_year} </span>
    </li>
  );
};

export default PeopleItem;
