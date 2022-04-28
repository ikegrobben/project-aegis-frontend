import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../logic/context";

// Import scss
import "./navigation.scss";

// Import images
import logo from "../../assets/images/logo-text.png";
import user from "../../assets/images/User.png";

function Navigation({ authenticated }) {
  const context = useContext(AuthContext);
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
                  to="/report/last-report"
                  className={({ isActive }) =>
                    "nav-link" + (isActive ? " activated" : "")
                  }
                >
                  Shift Report
                </NavLink>
              </li>
              <li className="header-nav__list-item">
                <NavLink
                  to="/monthly-report"
                  className={({ isActive }) =>
                    "nav-link" + (isActive ? " activated" : "")
                  }
                >
                  Monthly Report
                </NavLink>
              </li>
              <li className="header-nav__list-item">
                <NavLink
                  to="/all-reports"
                  className={({ isActive }) =>
                    "nav-link" + (isActive ? " activated" : "")
                  }
                >
                  All Reports
                </NavLink>
              </li>

              <li className="header-user">
                <NavLink to="/profile">
                  <p>{context.user.firstname + " " + context.user.lastname}</p>
                </NavLink>
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
