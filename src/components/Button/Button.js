import React from "react";

// Import scss
import "./_button.scss";

function Button({ name, type, classNameButton, clickFunction }) {
  return (
    <button className={classNameButton} type={type} onClick={clickFunction}>
      {name}
    </button>
  );
}

export default Button;
