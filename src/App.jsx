import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { refreshAccessToken } from "./utils/refreshToken";
import useAuthStore from "./store/authStore";
import "./index.css";

const App = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default App;
