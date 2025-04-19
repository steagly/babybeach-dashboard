import React from "react";
import ReactDOM from "react-dom/client";
import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Appointment from "./components/booking/BookingMain";
import Login from "./components/Login";
import Calendar from "./components/Calendar";
import Cards from "./components/Cards";
import SettingsPage from "./components/settings/SettingsPage";
import { refreshAccessToken } from "./utils/refreshToken";
import useAuthStore from "./store/authStore";
import { useState } from "react";
import AuthRoute from "./components/AuthRoute";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const Main = () => {
  const [loading, setLoading] = useState(true);
  const accessToken = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
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
          path: "booking",
          element: <Appointment />,
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
            {
              path: "settings",
              element: <SettingsPage />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <Main />
  </QueryClientProvider>
);
