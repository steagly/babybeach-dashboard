import { Outlet } from "react-router-dom";
import Overlay from "./components/Overlay";
import ToastNotification from "./components/notification/ToastNotification";
import "./index.css";

const App = () => {
  return (
    <div>
      <Overlay />
      <ToastNotification />
      <Outlet />
    </div>
  );
};

export default App;
