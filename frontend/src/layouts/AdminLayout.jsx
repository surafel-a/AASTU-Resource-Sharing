import { Outlet } from "react-router-dom";
import Sidebar from "../components/admin/Sidebar";
import Header from "../components/admin/Header";

export default function AdminLayout() {
  return (
    <div className="grid grid-cols-[250px_1fr] grid-rows-[80px_1fr] h-screen">
      <Sidebar />

      <Header />
      <main className="bg-[#F6F6F8] overflow-scroll">
        <Outlet />
      </main>
    </div>
  );
}
