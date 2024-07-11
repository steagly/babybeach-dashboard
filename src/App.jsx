import { useLayoutEffect } from "react";
import { Outlet } from "react-router-dom";
import { refreshAccessToken } from "./utils/refreshToken";
import useAuthStore from "./store/authStore";
import "./index.css";

const App = () => {
  const accessToken = useAuthStore((state) => state.accessToken);

  useLayoutEffect(() => {
    if (!accessToken) {
      refreshAccessToken();
    }
  }, [accessToken]);

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default App;
