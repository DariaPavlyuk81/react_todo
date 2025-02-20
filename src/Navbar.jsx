import React, {useState} from "react";

import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen,setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={`navbar ${isOpen ? "open" : ""}`}>
      <div className="hamburger" onClick={toggleNavbar}>
      &#9776;
      </div>


      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
};
export default Navbar;
