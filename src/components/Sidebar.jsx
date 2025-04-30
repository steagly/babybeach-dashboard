import axios from "axios";
import useAuthStore from "../store/authStore";
import { useNavigate, Link } from "react-router-dom";

import logo from "../assets/logo_light.svg";
import calendardIcon from "../assets/calendar.svg";
import dashboardIcon from "../assets/dashboard.svg";
import cardsIcon from "../assets/cards.svg";
import statsIcon from "../assets/stats.svg";
import settingsIcon from "../assets/settings.svg";
import exitIcon from "../assets/exit.svg";
import styles from "./Sidebar.module.css";
import useSideBarStore from "../store/sidebarStore";
import { useEffect } from "react";
import SidebarItem from "./SidebarItem";

function Sidebar() {
  const logout = useAuthStore((state) => state.logout);
  const toggleSidebar = useSideBarStore((state) => state.toggleSidebar);
  const sidebarIsOpen = useSideBarStore((state) => state.sidebarIsOpen);

  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: dashboardIcon },
    { name: "Calendar", path: "/dashboard/calendar", icon: calendardIcon },
    { name: "Cards", path: "/dashboard/cards", icon: cardsIcon },
    { name: "Statistics", path: "/dashboard", icon: statsIcon },
    { name: "Settings", path: "/dashboard/settings", icon: settingsIcon },
  ];

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5001/api/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );
      logout();
      navigate("/login");
    } catch (error) {
      throw new Error(error);
    }
  };

  const checkWindowSize = () => {
    if (window.innerWidth <= 890 && sidebarIsOpen) {
      toggleSidebar();
    }
  };

  useEffect(() => {
    checkWindowSize();

    window.addEventListener("resize", checkWindowSize);

    return () => window.removeEventListener("resize", checkWindowSize);
  }, [sidebarIsOpen]);

  return (
    <aside
      className={
        sidebarIsOpen ? styles.sidebar : `${styles.sidebar} ${styles.closed}`
      }
    >
      <div className={styles.top}>
        <img
          className={
            sidebarIsOpen ? `${styles.logo}` : `${styles.logo} ${styles.hidden}`
          }
          src={logo}
          alt="logo"
        />
        <button className={styles.close_btn} onClick={toggleSidebar}>
          {!sidebarIsOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
            >
              <path d="M19,13H3V11H19L15,7L16.4,5.6L22.8,12L16.4,18.4L15,17L19,13M3,6H13V8H3V6M13,16V18H3V16H13Z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
            >
              <path d="M5,13L9,17L7.6,18.42L1.18,12L7.6,5.58L9,7L5,11H21V13H5M21,6V8H11V6H21M21,16V18H11V16H21Z" />
            </svg>
          )}
        </button>
      </div>
      <div className={styles.center}>
        <ul>
          {menuItems.map((item) => {
            return <SidebarItem key={item.name} item={item} />;
          })}

          {sidebarIsOpen ? <p>account</p> : ""}
          <li onClick={handleLogout}>
            <a className={styles.link}>
              <img src={exitIcon} alt="dashboard-icon" />
              logout
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
