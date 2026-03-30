import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { UserProvider } from "./contexts/UserContext.jsx";
import { ResourceProvider } from "./contexts/ResourceContext.jsx";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <UserProvider>
        <ResourceProvider>
          <App />
          <ToastContainer position="top-right" autoClose={3000} />
        </ResourceProvider>
      </UserProvider>
    </AuthProvider>
  </StrictMode>,
);
