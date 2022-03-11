import React from "react";

// Import scss
import "./Navigation.scss";

// Import images
import logo from "../../assets/images/logodarktheme.png";

function Navigation() {
  return (
    <header>
      <img src={logo} alt="Aegis logo" />
    </header>
  );
}

export default Navigation;
