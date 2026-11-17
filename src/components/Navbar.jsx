import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="navbar">
      <NavLink to="/" className="logo">
        🎵 Eventos<span>Live</span>
      </NavLink>
      <span className="ciudad">📍 Bogotá, COL</span>
      <nav>
        <NavLink to="/">Home</NavLink>
      </nav>
    </header>
  );
}