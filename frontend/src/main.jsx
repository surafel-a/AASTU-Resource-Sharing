import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// Contexts
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { UserProvider } from "./contexts/UserContext.jsx";
import { CourseProvider } from "./contexts/CourseContext.jsx";
import { ResourceProvider } from "./contexts/ResourceContext.jsx";
import { BookmarkProvider } from "./contexts/BookmarkContext.jsx";
import { ProgressProvider } from "./contexts/ProgressContext.jsx";

// Toast notifications
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <UserProvider>
        <CourseProvider>
          <ResourceProvider>
            <BookmarkProvider>
              <ProgressProvider>
                <App />
                <ToastContainer position="top-right" autoClose={3000} />
              </ProgressProvider>
            </BookmarkProvider>
          </ResourceProvider>
        </CourseProvider>
      </UserProvider>
    </AuthProvider>
  </StrictMode>,
);
