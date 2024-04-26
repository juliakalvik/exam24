import { Router, Route, RootRoute } from "@tanstack/react-router";

import Root from "../App";
import OwnerProfile from "./OwnerProfile";
import FetchVenues from "../api";


const rootRoute = new RootRoute({
    component: Root,
  });


const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: FetchVenues,
});



const ownerProfileRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/ownerprofile:owner",
  component: OwnerProfile,
});


const routeTree = rootRoute.addChildren([
  indexRoute,
  ownerProfileRoute
  
]);

export const router = new Router({ routeTree });

export default router;
