import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// Contexts
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { UserProvider } from "./contexts/UserContext.jsx";
import { ResourceProvider } from "./contexts/ResourceContext.jsx";
import { BookmarkProvider } from "./contexts/BookmarkContext.jsx";

// Toast notifications
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <UserProvider>
        <ResourceProvider>
          <BookmarkProvider>
            <App />
            <ToastContainer position="top-right" autoClose={3000} />
          </BookmarkProvider>
        </ResourceProvider>
      </UserProvider>
    </AuthProvider>
  </StrictMode>,
);
