import { useEffect, useRef, useState } from "react";

const useSelect = () => {
  const [selectedValue, setSelectedValue] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef();
  const optionsRef = useRef();

  const selectValue = (value) => {
    setSelectedValue(value);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target) &&
        optionsRef.current &&
        !optionsRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleOpen = () => setIsOpen((prev) => !prev);

  return {
    isOpen,
    selectedValue,
    selectRef,
    optionsRef,
    toggleOpen,
    selectValue,
  };
};

export default useSelect;
