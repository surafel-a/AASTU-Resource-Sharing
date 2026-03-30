import { BrowserRouter, Route, Routes } from "react-router-dom";

// USER SIDE
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Library from "./pages/Library";
import MyUploads from "./pages/MyUploads";
import Bookmarks from "./pages/Bookmarks";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";

// ADMIN SIDE
import Dashboard from "./admin/Dashboard";
import Approvals from "./admin/Approvals";
import UserManagement from "./admin/UserManagement";
import ResourceManagement from "./admin/ResourceManagement";
import ReportManagement from "./admin/ReportManagement";
import Settings from "./admin/Settings";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* User Routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />

          <Route path="/library" element={<Library />} />
          <Route path="/uploads" element={<MyUploads />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="approvals" element={<Approvals />} />
          <Route path="user-management" element={<UserManagement />} />
          <Route path="resource-management" element={<ResourceManagement />} />
          <Route path="report-management" element={<ReportManagement />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
