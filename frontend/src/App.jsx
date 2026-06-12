import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

// USER SIDE
import Courses from "./pages/Courses";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Library from "./pages/Library";
import MyUploads from "./pages/MyUploads";
import Bookmarks from "./pages/Bookmarks";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import UploadResource from "./pages/UploadResource";
import EditCourse from "./pages/EditCourse";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import AddCourse from "./pages/AddCourse";
import UpdateResource from "./pages/UpdateResource";
import Reader from "./pages/Reader";
import PageNoteFound from "./pages/PageNotFound";
import CourseDetails from "./pages/CourseDetails";

// LAYOUTS
import MainLayout from "./layouts/MainLayout";
import CourseLayout from "./layouts/CourseLayout";
import ResourceLayout from "./layouts/ResourceLayout";
import AdminLayout from "./layouts/AdminLayout";

// ADMIN SIDE
import Settings from "./admin/Settings";
import Dashboard from "./admin/Dashboard";
import Approvals from "./admin/Approvals";
import UserManagement from "./admin/UserManagement";
import ResourceManagement from "./admin/ResourceManagement";
import ReportManagement from "./admin/ReportManagement";
import Notification from "./admin/Notification";
import AdminProfile from "./admin/AdminProfile";

// ROUTE GUARDS
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import AdminRoute from "./components/AdminRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* ================= PUBLIC ROUTES ================= */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* ================= PROTECTED USER ROUTES ================= */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/library" element={<Library />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/reader/:id" element={<Reader />} />

          {/* COURSES */}
          <Route path="/courses" element={<CourseLayout />}>
            <Route index element={<Courses />} />
            <Route path="add" element={<AddCourse />} />
            <Route path=":courseId/edit" element={<EditCourse />} />
            <Route path=":id" element={<CourseDetails />} />
          </Route>

          {/* UPLOADS */}
          <Route path="/uploads" element={<ResourceLayout />}>
            <Route index element={<MyUploads />} />
            <Route path="add" element={<UploadResource />} />
            <Route path=":resourceId/edit" element={<UpdateResource />} />
          </Route>
        </Route>

        {/* ================= ADMIN ROUTES ================= */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="approvals" element={<Approvals />} />
          <Route path="user-management" element={<UserManagement />} />
          <Route path="resource-management" element={<ResourceManagement />} />
          <Route path="report-management" element={<ReportManagement />} />
          <Route path="settings" element={<Settings />} />
          <Route path="notifications" element={<Notification />} />
          <Route path="profile" element={<AdminProfile />} />
        </Route>

        {/* ================= FALLBACK ================= */}
        <Route path="*" element={<PageNoteFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
