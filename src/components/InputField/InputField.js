import React from "react";

function InputField({
  inputId,
  inputName,
  inputType,
  register,
  requiredInput,
  classNameLabel,
  classNameInput,
}) {
  return (
    <>
      <label className={classNameLabel} htmlFor={inputId}></label>
      <input
        className={classNameInput}
        type={inputType}
        placeholder={inputName}
        {...register(inputId, { required: requiredInput })}
      />
    </>
  );
}

export default InputField;
