import { Router, Route, RootRoute } from "@tanstack/react-router";

import Root from "../App";
import OwnerProfile from "./OwnerProfile";
import FetchVenues from "../api";
import Home from "./Home";
import loginPage from "./Login";


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

  const LoginRoute = new Route({
    getParentRoute: () => rootRoute,
    path: "/login",
    component: loginPage,
  });
  

const ownerProfileRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/ownerprofile",
  component: OwnerProfile,
});


const routeTree = rootRoute.addChildren([
  indexRoute,
  ownerProfileRoute,
  homeRoute,
  LoginRoute
  
]);

export const router = new Router({ routeTree });

export default router;
