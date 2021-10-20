import React,{useState} from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav className="nav-container text-center">

      <ul className="nav-links font-weight-bold">

        <Link to="/">
          <li className="li-nav">Calculator</li>
        </Link>
        <Link to="/quater">
          <li className="li-nav">Quater Calculator</li>
        </Link>
      </ul>
    </nav>

  )
}




export default Nav;
