import { Outlet } from "@tanstack/react-router";
import Navbar from "./components/navbar";
import { useState } from "react";
import Footer from "./components/footer";

function App() {
  return (
    <>
      <main>
        <Navbar/>
        <Outlet />
        <Footer />
      </main>
    </>
  );
}

export default App;
