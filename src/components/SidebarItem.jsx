import { Link, useLocation } from "react-router-dom";
import { useCallback } from "react";

import Tooltip from "./Tooltip";

import useTooltip from "../hooks/useTooltip";
import useSideBarStore from "../store/sidebarStore";

import styles from "./Sidebar.module.css";

export default function SidebarItem({ item }) {
  const location = useLocation();
  const { tooltip, showTooltip, hideTooltip } = useTooltip();

  const sidebarIsOpen = useSideBarStore((state) => state.sidebarIsOpen);

  const handleMouseEnter = (e) => showTooltip(e, item.name);

  const handleMouseLeave = () => hideTooltip();

  const isActive = (path) => {
    if (sidebarIsOpen) {
      return location.pathname === path ? styles.link_active : "";
    } else if (!sidebarIsOpen) {
      return location.pathname === path ? styles.link_active_notext : "";
    }
  };

  return (
    <li>
      {tooltip.visible && (
        <Tooltip position={tooltip.position} visible={tooltip.visible}>
          {tooltip.label}
        </Tooltip>
      )}
      <Link
        className={`${styles.link} ${isActive(item.path)}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        to={item.path}
      >
        <img src={item.icon} alt="dashboard-icon" />
        {item.name}
      </Link>
    </li>
  );
}
