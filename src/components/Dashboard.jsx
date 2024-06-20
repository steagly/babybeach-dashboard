import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import styles from "./dashboard.module.css";
import DatePicker from "./DatePicker";

export default function Dashboard() {
  const location = useLocation();
  const dashboardRoute = location.pathname === "/dashboard";

  return (
    <div className={styles.dashboard}>
      <Sidebar />
      <div className={styles.home_container}>
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
