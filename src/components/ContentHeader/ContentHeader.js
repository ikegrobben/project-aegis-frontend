import React from "react";
import "./ContentHeader.scss";

// Import components
import Button from "../Button/Button";

function ContentHeader({ title, logOut }) {
  return (
    <section className="content-header">
      <h1 className="content-header__title">{title}</h1>
      <Button
        classNameButton="btn btn--red"
        type="button"
        name="Logout"
        clickFunction={logOut}
      />
    </section>
  );
}

export default ContentHeader;
