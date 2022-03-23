import React from "react";

// Import components
import Button from "../Button/Button";

// Import scss
import "./_contentheader.scss";

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
