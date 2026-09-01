import { createBrowserRouter, Outlet } from "react-router";
import { Home } from "./pages/Home";
import { Events } from "./pages/Events";
import { Team } from "./pages/Team";
import { RegistrationRedirect } from "./pages/RegistrationRedirect";
import { ScrollToTop } from "./components/ScrollToTop";

function RootLayout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "events",
        Component: Events,
      },
      {
        path: "team",
        Component: Team,
      },
      {
        path: "register",
        Component: RegistrationRedirect,
      },
    ],
  },
]);
