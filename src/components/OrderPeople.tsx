import { PeopleData } from "@/pages/characters/[pageId]";
import { useState, useEffect } from "react";
import { FaArrowCircleDown } from "@react-icons/all-files/fa/FaArrowCircleDown";
import { FaArrowCircleUp } from "@react-icons/all-files/fa/FaArrowCircleUp";

type SortField = "id" | "name" | "gender" | "birth_year" | "mass" | "height";

type SortState = Record<SortField, boolean>;

const initialState: SortState = {
  id: false,
  name: false,
  gender: false,
  birth_year: false,
  mass: false,
  height: false,
};

const OrderPeople: React.FC<{
  items: PeopleData[];
  onOrderChange: (filteredPeople: PeopleData[]) => void;
}> = (props) => {
  const [sortField, setSortField] = useState<SortField>("id");
  /*const [idField, setIdField] = useState(false);
  const [nameField, setNameField] = useState(false);
  const [genderField, setGenderField] = useState(false);
  const [birthField, setBirthField] = useState(false);
  const [massField, setMassField] = useState(false);
  const [heightField, setHeightField] = useState(false);*/
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [sortState, setSortState] = useState<SortState>(initialState);

  /*const handleSortClick = (field: string) => {
    if (sortField == field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field as SortField);
      setSortDirection("asc");
    }
    setArrow(field);
  };

  

  const setBackTheRest = (field: string) => {
    if (field === "id") {
      setNameField(false);
      setGenderField(false);
      setBirthField(false);
      setMassField(false);
      setHeightField(false);
    } else if (field === "name") {
      setIdField(false);
      setGenderField(false);
      setBirthField(false);
      setMassField(false);
      setHeightField(false);
    } else if (field === "gender") {
      setNameField(false);
      setIdField(false);
      setBirthField(false);
      setMassField(false);
      setHeightField(false);
    } else if (field === "birth_year") {
      setNameField(false);
      setGenderField(false);
      setIdField(false);
      setMassField(false);
      setHeightField(false);
    } else if (field === "mass") {
      setNameField(false);
      setGenderField(false);
      setBirthField(false);
      setIdField(false);
      setHeightField(false);
    } else {
      setNameField(false);
      setGenderField(false);
      setBirthField(false);
      setMassField(false);
      setIdField(false);
    }
  };

  const setArrow = (field: string) => {
    if (field === "id") {
      if (sortDirection === "asc") {
        setIdField(true);
        setBackTheRest(field);
      } else {
        setIdField(false);
        setBackTheRest(field);
      }
    } else if (field === "name") {
      if (sortDirection === "asc") {
        setNameField(true);
        setBackTheRest(field);
      } else {
        setNameField(false);
        setBackTheRest(field);
      }
    } else if (field === "gender") {
      if (sortDirection === "asc") {
        setGenderField(true);
        setBackTheRest(field);
      } else {
        setGenderField(false);
        setBackTheRest(field);
      }
    } else if (field === "birth_year") {
      if (sortDirection === "asc") {
        setBirthField(true);
        setBackTheRest(field);
      } else {
        setBirthField(false);
        setBackTheRest(field);
      }
    } else if (field === "mass") {
      if (sortDirection === "asc") {
        setMassField(true);
        setBackTheRest(field);
      } else {
        setMassField(false);
        setBackTheRest(field);
      }
    } else if (field === "height") {
      if (sortDirection === "asc") {
        setHeightField(true);
        setBackTheRest(field);
      } else {
        setHeightField(false);
        setBackTheRest(field);
      }
    }
  };*/

  const handleSortClick = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
    setSortState((prevState) => {
      const updatedState: SortState = { ...initialState };
      updatedState[field] = true;
      return updatedState;
    });
  };

  const setBackTheRest = (field: SortField) => {
    setSortState((prevState) => {
      const updatedState: SortState = { ...initialState };
      updatedState[field] = true;
      return updatedState;
    });
  };

  const setArrow = (field: SortField) => {
    setSortState((prevState) => {
      const updatedState: SortState = { ...initialState };
      updatedState[field] = sortDirection === "asc";
      return updatedState;
    });
  };

  useEffect(() => {
    const sortedItems = [...props.items].sort((a, b) => {
      if (sortField == "height" || sortField == "mass" || sortField == "id") {
        const aValue =
          typeof a[sortField] === "number"
            ? a[sortField]
            : Number(a[sortField]);
        const bValue =
          typeof b[sortField] === "number"
            ? b[sortField]
            : Number(b[sortField]);

        if (sortDirection === "asc") {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      } else if (sortField == "birth_year") {
        const aVal = extractNumbersFromString(a[sortField]);
        const bVal = extractNumbersFromString(b[sortField]);
        if (sortDirection === "asc") {
          return aVal > bVal ? 1 : -1;
        } else {
          return aVal < bVal ? 1 : -1;
        }
      } else {
        if (sortDirection === "asc") {
          return String(a[sortField]).localeCompare(String(b[sortField]));
        } else {
          return String(b[sortField]).localeCompare(String(a[sortField]));
        }
      }
    });

    props.onOrderChange(sortedItems);
  }, [sortDirection, sortField]);

  const extractNumbersFromString = (str: string): number => {
    const matches = str.match(/\d+/);
    return matches ? parseInt(matches[0], 10) : NaN;
  };

  return (
    <li className="p-3 grid gap-4 grid-cols-6 border-2 border-black">
      <div>
        <span className="p-1">Id</span>
        {!sortState.id && (
          <FaArrowCircleDown
            className="inline-block"
            onClick={() => handleSortClick("id")}
          />
        )}
        {sortState.id && (
          <FaArrowCircleUp
            className="inline-block"
            onClick={() => handleSortClick("id")}
          />
        )}
      </div>
      <div>
        <span className="p-1">Name</span>
        {!sortState.name && (
          <FaArrowCircleDown
            className="inline-block"
            onClick={() => handleSortClick("name")}
          />
        )}
        {sortState.name && (
          <FaArrowCircleUp
            className="inline-block"
            onClick={() => handleSortClick("name")}
          />
        )}
      </div>
      <div>
        <span className="p-1">Gender</span>
        {!sortState.gender && (
          <FaArrowCircleDown
            className="inline-block"
            onClick={() => handleSortClick("gender")}
          />
        )}
        {sortState.gender && (
          <FaArrowCircleUp
            className="inline-block"
            onClick={() => handleSortClick("gender")}
          />
        )}
      </div>
      <div>
        <span className="p-1">Birth Year</span>
        {!sortState.birth_year && (
          <FaArrowCircleDown
            className="inline-block"
            onClick={() => handleSortClick("birth_year")}
          />
        )}
        {sortState.birth_year && (
          <FaArrowCircleUp
            className="inline-block"
            onClick={() => handleSortClick("birth_year")}
          />
        )}
      </div>
      <div>
        <span className="p-1">Mass</span>
        {!sortState.mass && (
          <FaArrowCircleDown
            className="inline-block"
            onClick={() => handleSortClick("mass")}
          />
        )}
        {sortState.mass && (
          <FaArrowCircleUp
            className="inline-block"
            onClick={() => handleSortClick("mass")}
          />
        )}
      </div>
      <div>
        <span className="p-1">Height</span>
        {!sortState.height && (
          <FaArrowCircleDown
            className="inline-block"
            onClick={() => handleSortClick("height")}
          />
        )}
        {sortState.height && "desc" && (
          <FaArrowCircleUp
            className="inline-block"
            onClick={() => handleSortClick("height")}
          />
        )}
      </div>
    </li>
  );
};

export default OrderPeople;
