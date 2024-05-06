import { Link } from "@tanstack/react-router";
import Home from "../../pages/Home";

export default function Nav() {
  return (
    <>
      <p>Navbar</p>
      <div className="navbar">
        <Link to="/">Home</Link>
        <Link to="/venues">Venues</Link>
        <Link to="/ownerprofile">Owners</Link>
      </div>
    </>
  );
}
