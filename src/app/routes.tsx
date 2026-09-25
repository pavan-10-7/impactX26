import { createBrowserRouter, Outlet } from "react-router";
import { Home } from "./pages/Home";
import { Events } from "./pages/Events";
import { Team } from "./pages/Team";
import { RegistrationClosed } from "./pages/RegistrationClosed";
import { TermsAndConditions } from "./pages/TermsAndConditions";
import { Sponsor } from "./pages/Sponsor";
import { ScrollToTop } from "./components/ScrollToTop";
import { RegistrationClosedModal } from "./components/RegistrationClosedModal";

function RootLayout() {
  return (
    <>
      <ScrollToTop />
      <RegistrationClosedModal />
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
        path: "registration-closed",
        Component: RegistrationClosed,
      },
      {
        path: "terms-and-conditions",
        Component: TermsAndConditions,
      },
      {
        path: "sponsor",
        Component: Sponsor,
      },
    ],
  },
]);
