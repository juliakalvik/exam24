import { Outlet } from "@tanstack/react-router";
import Navbar from "./components/navbar";
import { useState } from "react";

function App() {
  return (
    <>
      <main>
        <Navbar/>
        <Outlet />
      </main>
    </>
  );
}

export default App;
