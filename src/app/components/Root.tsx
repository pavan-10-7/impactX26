import { Outlet } from "react-router";
import { Navbar } from "./Navbar";

export function Root() {
  return (
    <div className="min-h-screen bg-[#020617]">
      <Navbar />
      <Outlet />
    </div>
  );
}
