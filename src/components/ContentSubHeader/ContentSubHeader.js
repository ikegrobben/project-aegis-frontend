import React from "react";

// Import components
import Button from "../Button/Button";

import "./ContentSubHeader.scss";

function ContentSubHeader({ title, hideBar }) {
  function hideTopBar() {
    if (hideBar === "yes") {
      return "top-bar hide";
    }
    return "top-bar";
  }

  return (
    <>
      <section className="content-sub-header">
        <h2 className="content-sub-header__title">{title}</h2>
        <Button
          name="New item"
          type="button"
          classNameButton="btn btn--light-blue"
        />
      </section>
      <div className={hideTopBar()}>
        <div className="top-bar__date-time">
          <span>Date & Time</span>
        </div>{" "}
        <div className="top-bar__report">
          <span>Report item</span>
        </div>
        <div className="top-bar__status">
          <span>Status</span>
        </div>
        <div className="top-bar__comments">
          <span>Comments</span>
        </div>
      </div>
    </>
  );
}

export default ContentSubHeader;