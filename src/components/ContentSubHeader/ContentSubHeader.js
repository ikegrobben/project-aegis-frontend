import React from "react";
import { useForm } from "react-hook-form";

// Import components
import Button from "../Button/Button";

// import scss file
import "./contentsubheader.scss";

function ContentSubHeader({ title, hideBar, setNewMonth }) {
  const { register, handleSubmit } = useForm();

  function setAMonth(data) {
    setNewMonth(data.Month);
  }
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
        <div className="container-button-select">
          <form onChange={handleSubmit(setAMonth)}>
            <select {...register("Month", { required: true })}>
              <option value="">Choose a month</option>
              <option value="0">January</option>
              <option value="1">February</option>
              <option value="2">March</option>
            </select>
          </form>
          <Button
            name="New item"
            type="button"
            classNameButton="btn btn--light-blue"
          />
        </div>
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
