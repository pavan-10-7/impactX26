import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { Events } from "./pages/Events";
import { Team } from "./pages/Team";
import { Sponsor } from "./pages/Sponsor";

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
  {
  path: "/sponsor",
  Component: Sponsor,
  },
]);
