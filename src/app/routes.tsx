import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { Events } from "./pages/Events";
import { Team } from "./pages/Team";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/events",
    Component: Events,
  },
  {
    path: "/team",
    Component: Team,
  },
]);
