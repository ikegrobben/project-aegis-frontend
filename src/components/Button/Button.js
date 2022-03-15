import React from "react";
import "./Button.scss";

function Button({ name, type, classNameButton, clickFunction }) {
  return (
    <button className={classNameButton} type={type} onClick={clickFunction}>
      {name}
    </button>
  );
}

export default Button;
