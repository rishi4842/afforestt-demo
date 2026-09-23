import { useState } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="nav-container">
        <a href="#" className="logo">
          AFFORESTT
        </a>

        <button
          className="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "CLOSE" : "MENU"}
        </button>

        <nav className={menuOpen ? "nav-links open" : "nav-links"}>
          <a href="#trainings">Trainings</a>
          <a href="#booking">Dates</a>
          <a href="#webinar">Webinars</a>
          <a href="#testimonials">Testimonials</a>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
