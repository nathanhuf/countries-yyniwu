import { useState } from "react";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import "./Dropdown.scss";

export const useDropdown = (defaultItem: string, items: string[]) => {
  const [listItems, setListItems] = useState<string[]>(items);
  const [selectedItem, setSelectedItem] = useState<string>(defaultItem);
  const [listOpen, setListOpen] = useState<boolean>(false);

  const toggleListOpen = () => {
    setListOpen((listOpen) => !listOpen);
  };

  const handleSelectedItemChange = (item: string) => {
    setSelectedItem(item);
    setListOpen(false);
  };

  return {
    selectedItem,
    updateDropdownList: (items: string[]) => {
      setListItems(items);
    },
    Dropdown: (
      <div
        className="select-wrapper"
        tabIndex={0}
        onBlur={() => setListOpen(false)}
      >
        <div className="select-header" onClick={toggleListOpen}>
          <p>{selectedItem || "Filter by Region"}</p>
          {listOpen ? (
            <ChevronUpIcon width="12px" />
          ) : (
            <ChevronDownIcon width="12px" />
          )}
        </div>
        {listOpen && (
          <ul className="select-content">
            {listItems.map((item) => (
              <li key={item} onClick={() => handleSelectedItemChange(item)}>
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    ),
  };
};
