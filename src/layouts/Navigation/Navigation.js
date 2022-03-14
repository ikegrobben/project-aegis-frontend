import React from "react";
import { Link, NavLink } from "react-router-dom";

// Import scss
import "./Navigation.scss";

// Import images
import logo from "../../assets/images/logodarktheme.png";
import user from "../../assets/images/User.png";

function Navigation({ authenticated }) {
  function toggleNavigation() {
    const navToggle = document.querySelector(".mobile-nav-toggle");
    const mobileNav = document.querySelector(".header-nav__list");
    const visibility = mobileNav.getAttribute("data-visible");
    if (visibility === "false") {
      mobileNav.setAttribute("data-visible", true);
      navToggle.setAttribute("aria-expanded", true);
    } else {
      mobileNav.setAttribute("data-visible", false);
      navToggle.setAttribute("aria-expanded", false);
    }
  }

  return (
    <>
      <header className="header">
        <figure className="header-logo">
          <Link to="/">
            <img className="header-logo__img" src={logo} alt="Aegis logo" />
          </Link>
        </figure>
        {authenticated === true ? (
          <button
            className="mobile-nav-toggle"
            aria-controls="nav__list"
            aria-expanded="false"
            onClick={toggleNavigation}
          >
            <span className="sr-only">Menu</span>
          </button>
        ) : (
          ""
        )}
        <nav className="header-nav">
          {authenticated === true ? (
            <ul
              data-visible="false"
              id="nav__list"
              className="header-nav__list"
            >
              <li className="header-nav__list-item">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    "nav-link" + (isActive ? " activated" : "")
                  }
                >
                  Dashboard
                </NavLink>
              </li>
              <li className="header-nav__list-item">
                <NavLink
                  to="/shift-report"
                  className={({ isActive }) =>
                    "nav-link" + (isActive ? " activated" : "")
                  }
                >
                  Shift Report
                </NavLink>
              </li>
              <li className="header-nav__list-item">
                <NavLink to="/monthly-report">Monthly Report</NavLink>
              </li>
              <li className="header-nav__list-item">
                <NavLink to="/all-report">All Reports</NavLink>
              </li>
              <li className="header-user">
                <img src={user} alt="Profile" />
              </li>
            </ul>
          ) : (
            ""
          )}
        </nav>
      </header>
    </>
  );
}

export default Navigation;
