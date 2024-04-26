import FetchVenues from "./api";
import { Outlet } from "@tanstack/react-router";

function App() {
  return (
    <>
      <main>
        <FetchVenues />
        <Outlet />
      </main>
    </>
  );
}

export default App;
