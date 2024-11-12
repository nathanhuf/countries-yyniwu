import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import "./SearchInput.scss";

export const useSearchInput = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleChangeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return {
    searchQuery,
    setSearchQuery,
    SearchInput: (
      <div className="input-group">
        <MagnifyingGlassIcon width="16px" color="white" />
        <input
          className="query-input"
          placeholder="Search for a country..."
          value={searchQuery}
          onChange={handleChangeQuery}
        />
      </div>
    ),
  };
};
