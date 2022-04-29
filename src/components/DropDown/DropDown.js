import React from "react";

function DropDown({
  name,
  dropDownId,
  register,
  classNameLabel,
  classNameDropDown,
  options,
  dropdownText,
  isRequired,
  selected,
  errormsg,
}) {
  return (
    <>
      <label className={classNameLabel} htmlFor={dropDownId}></label>
      <select
        name={name}
        className={classNameDropDown}
        {...register(dropDownId, { required: isRequired })}
        defaultValue={selected}
      >
        <option value="" hidden>
          {dropdownText}
        </option>
        {options.map((option) => {
          return (
            <option key={option.name} value={option.id}>
              {option.name}
            </option>
          );
        })}
      </select>
      {errormsg}
    </>
  );
}

export default DropDown;
