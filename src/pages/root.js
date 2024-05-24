import { Router, Route, RootRoute } from "@tanstack/react-router";

import Root from "../App";
import OwnerProfile from "./UserProfile";
import FetchVenues from "../components/venues";
import Home from "./Home";
import loginPage from "./Login";
import AllAdmins from "./AdminList";
import RegisterPage from "./Register";
import VenueSpecific from "./VenueDetails";
import manageVenues from "./ManageVenues";
import ProfilesList from "./Profiles";


const rootRoute = new RootRoute({
    component: Root,
  });
  
  const homeRoute = new Route({
    getParentRoute: () => rootRoute,
    path: "/",
    component: Home,
  });
  
  const indexRoute = new Route({
    getParentRoute: () => rootRoute,
    path: "/venues",
    component: FetchVenues,
  });

  const VenueDetailsRoute = new Route({
    getParentRoute: () => rootRoute,
    path: "/venuedetails",
    component: VenueSpecific,
  });

  const adminsRoute = new Route({
    getParentRoute: () => rootRoute,
    path: "/adminlist",
    component: AllAdmins,
  });

  const loginRoute = new Route({
    getParentRoute: () => rootRoute,
    path: "/login",
    component: loginPage,
  });

  const registerRoute = new Route({
    getParentRoute: () => rootRoute,
    path: "/register",
    component: RegisterPage,
  });


const userProfileRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/userprofile",
  component: OwnerProfile,
});


const manageVenuesRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/managevenues",
  component: manageVenues,
});





/* const userProfileRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/userprofile",
  component: regularUserProfile,
});
 */
const fetchProfilesRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/profiles",
  component: ProfilesList,
});



const routeTree = rootRoute.addChildren([
  indexRoute,
  homeRoute,
  loginRoute,
  adminsRoute,
  VenueDetailsRoute,
  registerRoute,
  userProfileRoute,
  manageVenuesRoute,
  fetchProfilesRoute,

]);

export const router = new Router({ routeTree });

export default router;
