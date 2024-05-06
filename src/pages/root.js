import { Router, Route, RootRoute } from "@tanstack/react-router";

import Root from "../App";
import OwnerProfile from "./OwnerProfile";
import FetchVenues from "../api";
import Home from "./Home";


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
  

const ownerProfileRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/ownerprofile",
  component: OwnerProfile,
});


const routeTree = rootRoute.addChildren([
  indexRoute,
  ownerProfileRoute,
  homeRoute
  
]);

export const router = new Router({ routeTree });

export default router;
