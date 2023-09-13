import React, { useCallback, useEffect, useRef, useState } from "react";

import { useOnClickOutside } from "@/hooks/use-on-click-outside";

interface Props {
  options: {
    icon?: React.ReactElement;
    label: string;
    value: string;
  }[];
  select: string;
  setSelect: React.Dispatch<React.SetStateAction<string>>;
}

export const Select: React.FC<Props> = ({ options, select, setSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key !== "Escape") return;

      setIsOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = useCallback(
    (item: string) => {
      setIsOpen(false);
      setSelect(item);
    },
    [setIsOpen, setSelect],
  );

  useOnClickOutside(dropdownRef, () => setIsOpen(false));

  return (
    <div
      aria-expanded={isOpen}
      ref={dropdownRef}
      className="relative whitespace-nowrap"
    >
      <div
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={(e) => {
          const key = e.key;

          if (key !== "Enter" && key !== " ") return;

          e.preventDefault();
          setIsOpen(!isOpen);
        }}
        role="button"
        tabIndex={0}
        className="group flex aspect-square h-full w-fit cursor-pointer items-center justify-center text-[10px] font-black text-black/75"
      >
        {select}
      </div>
      {isOpen && (
        <ul
          role="listbox"
          className="absolute inset-0 top-[calc(100%+8px)] h-fit w-fit divide-y divide-black/25 rounded border border-black/25 bg-white shadow-md"
        >
          {options.map((option) => (
            <li
              aria-selected={select.includes(option.value)}
              key={option.value}
              role="option"
              className="whitespace-nowrap bg-transparent font-black text-black/50 hover:bg-[#cccccc]/25 hover:text-black/75"
            >
              <button
                onClick={() => handleSelect(option.value)}
                className="grid aspect-square h-8 w-8 place-items-center text-[10px]"
              >
                {option.label}{" "}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;
