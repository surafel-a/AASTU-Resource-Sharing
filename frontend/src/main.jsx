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
import { ReviewProvider } from "./contexts/ReviewContext.jsx";
import { CommentProvider } from "./contexts/CommentContext.jsx";
import { ReportProvider } from "./contexts/ReportContext.jsx";
import { NotificationProvider } from "./contexts/NotificationContext.jsx";
import { AdminSettingsProvider } from "./contexts/AdminSettingsContext.jsx";

// Toast notifications
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <UserProvider>
        <AdminSettingsProvider>
          <NotificationProvider>
            <CourseProvider>
              <ResourceProvider>
                <BookmarkProvider>
                  <ProgressProvider>
                    <ReviewProvider>
                      <CommentProvider>
                        <ReportProvider>
                          <App />
                          <ToastContainer
                            position="top-right"
                            autoClose={3000}
                          />
                        </ReportProvider>
                      </CommentProvider>
                    </ReviewProvider>
                  </ProgressProvider>
                </BookmarkProvider>
              </ResourceProvider>
            </CourseProvider>
          </NotificationProvider>
        </AdminSettingsProvider>
      </UserProvider>
    </AuthProvider>
  </StrictMode>,
);
