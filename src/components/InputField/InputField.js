import React from "react";

function InputField({
  inputId,
  inputName,
  inputType,
  register,
  requiredInput,
}) {
  return (
    <label htmlFor={inputId}>
      <input
        type={inputType}
        placeholder={inputName}
        {...register(inputId, { required: requiredInput })}
      />
    </label>
  );
}

export default InputField;
