import { PeopleData } from "@/pages/characters/[pageId]";
import { useState, useEffect } from "react";
import { FaArrowCircleDown } from "@react-icons/all-files/fa/FaArrowCircleDown";
import { FaArrowCircleUp } from "@react-icons/all-files/fa/FaArrowCircleUp";

type SortField = "id" | "name" | "gender" | "birth_year" | "mass" | "height";

const OrderPeople: React.FC<{
  items: PeopleData[];
  onOrderChange: (filteredPeople: PeopleData[]) => void;
}> = (props) => {
  const [sortField, setSortField] = useState<SortField>("id");
  const [idField, setIdField] = useState(false);
  const [nameField, setNameField] = useState(false);
  const [genderField, setGenderField] = useState(false);
  const [birthField, setBirthField] = useState(false);
  const [massField, setMassField] = useState(false);
  const [heightField, setHeightField] = useState(false);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSortClick = (field: string) => {
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
        {!idField && (
          <FaArrowCircleDown
            className="inline-block"
            onClick={() => handleSortClick("id")}
          />
        )}
        {idField && (
          <FaArrowCircleUp
            className="inline-block"
            onClick={() => handleSortClick("id")}
          />
        )}
      </div>
      <div>
        <span className="p-1">Name</span>
        {!nameField && (
          <FaArrowCircleDown
            className="inline-block"
            onClick={() => handleSortClick("name")}
          />
        )}
        {nameField && (
          <FaArrowCircleUp
            className="inline-block"
            onClick={() => handleSortClick("name")}
          />
        )}
      </div>
      <div>
        <span className="p-1">Gender</span>
        {!genderField && (
          <FaArrowCircleDown
            className="inline-block"
            onClick={() => handleSortClick("gender")}
          />
        )}
        {genderField && (
          <FaArrowCircleUp
            className="inline-block"
            onClick={() => handleSortClick("gender")}
          />
        )}
      </div>
      <div>
        <span className="p-1">Birth Year</span>
        {!birthField && (
          <FaArrowCircleDown
            className="inline-block"
            onClick={() => handleSortClick("birth_year")}
          />
        )}
        {birthField && (
          <FaArrowCircleUp
            className="inline-block"
            onClick={() => handleSortClick("birth_year")}
          />
        )}
      </div>
      <div>
        <span className="p-1">Mass</span>
        {!massField && (
          <FaArrowCircleDown
            className="inline-block"
            onClick={() => handleSortClick("mass")}
          />
        )}
        {massField && (
          <FaArrowCircleUp
            className="inline-block"
            onClick={() => handleSortClick("mass")}
          />
        )}
      </div>
      <div>
        <span className="p-1">Height</span>
        {!heightField && (
          <FaArrowCircleDown
            className="inline-block"
            onClick={() => handleSortClick("height")}
          />
        )}
        {heightField && "desc" && (
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
