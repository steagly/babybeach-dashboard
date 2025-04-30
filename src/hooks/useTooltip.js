import { useState, useRef } from "react";
import useSideBarStore from "../store/sidebarStore";

const useTooltip = (delay = 400) => {
  const sidebarIsOpen = useSideBarStore((state) => state.sidebarIsOpen);

  const [tooltip, setTooltip] = useState({
    visible: false,
    label: "",
    position: {},
  });

  const timeoutRef = useRef(null);

  const showTooltip = (event, label) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (!sidebarIsOpen) {
      timeoutRef.current = setTimeout(() => {
        const rect = event.target.getBoundingClientRect();

        setTooltip({
          visible: true,
          label,
          position: {
            left: rect.right + 14,
            top: rect.top + rect.height / 2,
          },
        });
      }, delay);
    }
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      if (!sidebarIsOpen) {
        setTooltip((prev) => ({ ...prev, visible: false }));
      }
    }, 300);
  };

  return { tooltip, showTooltip, hideTooltip };
};

export default useTooltip;
