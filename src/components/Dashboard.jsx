import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import styles from "./Dashboard.module.css";
import useSideBarStore from "../store/sidebarStore";

export default function Dashboard() {
  const location = useLocation();
  const dashboardRoute = location.pathname === "/dashboard";
  const { sidebarIsOpen } = useSideBarStore();

  return (
    <div className={styles.dashboard}>
      <Sidebar />
      <div
        className={
          sidebarIsOpen
            ? styles.home_container
            : `${styles.home_container} ${styles.container_max}`
        }
      >
        {dashboardRoute && (
          <>
            <Header sectionName={"Dashboard"} />
            <h1>This is a Dashboard</h1>
          </>
        )}
        <Outlet />
      </div>
    </div>
  );
}
