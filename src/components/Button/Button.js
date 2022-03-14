import React from "react";
import "./Button.scss";

function Button({ name, type, classNameButton }) {
  return (
    <button className={classNameButton} type={type}>
      {name}
    </button>
  );
}

export default Button;
