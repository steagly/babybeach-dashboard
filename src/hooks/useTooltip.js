import { useState } from "react";

const useTooltip = () => {
  const [tooltip, setTooltip] = useState({
    visible: false,
    label: "",
    position: {},
  });

  const showTooltip = (event, label) => {
    const rect = event.target.getBoundingClientRect();

    setTooltip({
      visible: true,
      label,
      position: {
        left: rect.right + 14,
        top: rect.top + rect.height / 2,
      },
    });
  };

  const hideTooltip = () => {
    setTooltip({ visible: false, label: "", position: {} });
  };

  return { tooltip, showTooltip, hideTooltip };
};

export default useTooltip;
