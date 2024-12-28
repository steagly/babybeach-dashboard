import { useState } from "react";

const useAccordionState = () => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const setAccordionState = () => {
    setIsAccordionOpen((prev) => !prev);
  };

  return {
    isAccordionOpen,
    setAccordionState,
  };
};

export default useAccordionState;
