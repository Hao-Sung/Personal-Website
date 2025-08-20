import { StrictMode, createContext } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

import Home from "./pages/Home.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import "./main.sass";

// Setup global variable
export const globalContext = createContext();

// React Router data mode
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <globalContext.Provider
        value={{
          layoutBreakpoint: "480px",
          containerStartOffset: "30%",
          containerEndOffset: "30%",
          debug: false,
        }}
      >
        <Home />
      </globalContext.Provider>
    ),
    errorElement: <ErrorPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
