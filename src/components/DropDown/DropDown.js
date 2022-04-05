import React from "react";

function DropDown({
  dropDownId,
  register,
  classNameLabel,
  classNameDropDown,
  options,
  selected,
}) {
  return (
    <>
      <label className={classNameLabel} htmlFor={dropDownId}></label>
      <select
        defaultValue={selected}
        className={classNameDropDown}
        {...register(dropDownId)}
      >
        {options.map((option) => {
          return (
            <option key={option.option} value={option.option}>
              {option.option}
            </option>
          );
        })}
      </select>
    </>
  );
}

export default DropDown;
