import React from "react";
import ReactDOM from "react-dom/client";
import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/Login";
import Calendar from "./components/Calendar";
import Cards from "./components/Cards";
import { refreshAccessToken } from "./utils/refreshToken";
import useAuthStore from "./store/authStore";
import { useState } from "react";
import AuthRoute from "./components/AuthRoute";

const Main = () => {
  const [loading, setLoading] = useState(true);
  const accessToken = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!accessToken) {
          await refreshAccessToken();
        }
      } catch (error) {
        console.error("Error refreshing access token", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "login",
          element: <AuthRoute element={<Login />} />,
        },
        {
          path: "dashboard",
          element: <ProtectedRoute element={<Dashboard />} loading={loading} />,
          children: [
            {
              path: "calendar",
              element: <Calendar />,
            },
            {
              path: "cards",
              element: <Cards />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Main />
  // </React.StrictMode>
);
