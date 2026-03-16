import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function MainLayout() {
  return (
    <>
      <div className="mx-10">
        <Navbar />
      </div>

      <Outlet />
    </>
  );
}
