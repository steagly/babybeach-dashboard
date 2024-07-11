import axios from "axios";
import useAuthStore from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

import logo from "../assets/logo_light.svg";
import calendardIcon from "../assets/calendar.svg";
import dashboardIcon from "../assets/dashboard.svg";
import cardsIcon from "../assets/cards.svg";
import statsIcon from "../assets/stats.svg";
import settingsIcon from "../assets/settings.svg";
import exitIcon from "../assets/exit.svg";
import styles from "./Sidebar.module.css";
import useSideBarStore from "../store/sidebarStore";

function Sidebar() {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const location = useLocation();

  const { toggleSidebar, sidebarIsOpen } = useSideBarStore();

  const isActive = (path) =>
    (location.pathname === path) & sidebarIsOpen ? styles.link_active : "";

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

  return (
    <aside
      className={
        sidebarIsOpen ? styles.sidebar : `${styles.sidebar} ${styles.closed}`
      }
    >
      <div className={styles.top}>
        <img src={logo} alt="logo" />
        <button className={styles.close_btn} onClick={toggleSidebar}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="18px"
            height="18px"
          >
            <path
              d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
              fill="#525252"
            />
          </svg>
        </button>
      </div>
      <div className={styles.center}>
        <ul>
          <li>
            <Link
              className={`${styles.link} ${isActive("/dashboard")}`}
              to="/dashboard"
            >
              <img src={dashboardIcon} alt="dashboard-icon" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              className={`${styles.link} ${isActive("/dashboard/calendar")}`}
              to="/dashboard/calendar"
            >
              <img src={calendardIcon} alt="dashboard-icon" />
              Calendar
            </Link>
          </li>
          <li>
            <Link
              className={`${styles.link} ${isActive("/dashboard/cards")}`}
              to="/dashboard/cards"
            >
              <img src={cardsIcon} alt="dashboard-icon" />
              Cards
            </Link>
          </li>
          <li>
            <Link className={styles.link} to="/dashboard">
              <img src={statsIcon} alt="dashboard-icon" />
              Statistics
            </Link>
          </li>
          <p>{sidebarIsOpen ? "account" : ""}</p>
          <li>
            <Link className={styles.link} to="/dashboard">
              <img src={settingsIcon} alt="dashboard-icon" />
              Settings
            </Link>
          </li>
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
