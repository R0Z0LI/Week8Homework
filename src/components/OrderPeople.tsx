import { PeopleData } from "@/pages/characters/[pageId]";
import { useState, useEffect } from "react";

type SortField = "id" | "name" | "gender" | "birth_year" | "mass" | "height";

const OrderPeople: React.FC<{
  items: PeopleData[];
  onOrderChange: (filteredPeople: PeopleData[]) => void;
}> = (props) => {
  const [sortField, setSortField] = useState<SortField>("id");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSortClick = (field: string) => {
    if (sortField == field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field as SortField);
      setSortDirection("asc");
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
    console.log(sortedItems);
    props.onOrderChange(sortedItems);
  }, [sortDirection, sortField]);

  const extractNumbersFromString = (str: string): number => {
    const matches = str.match(/\d+/);
    return matches ? parseInt(matches[0], 10) : NaN;
  };

  return (
    <li className="p-3 grid gap-4 grid-cols-6">
      <span className="p-1 pr-10" onClick={() => handleSortClick("id")}>
        Id{" "}
      </span>
      <span className="p-1" onClick={() => handleSortClick("name")}>
        Name{" "}
      </span>
      <span className="p-1" onClick={() => handleSortClick("gender")}>
        Gender{" "}
      </span>
      <span className="p-1" onClick={() => handleSortClick("birth_year")}>
        Birth Year
      </span>
      <span className="p-1" onClick={() => handleSortClick("mass")}>
        Mass
      </span>
      <span className="p-1" onClick={() => handleSortClick("height")}>
        Height
      </span>
    </li>
  );
};

export default OrderPeople;
