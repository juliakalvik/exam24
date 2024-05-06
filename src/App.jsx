import { Outlet } from "@tanstack/react-router";
import Home from "./pages/Home";
import Navbar from "./components/navbar";

function App() {
  return (
    <>
      <main>
        <Navbar />
        <Outlet />
      </main>
    </>
  );
}

export default App;
