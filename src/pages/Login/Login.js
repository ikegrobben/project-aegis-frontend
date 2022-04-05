import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

// Import components
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";

// Import scss
import "./login.scss";

// Function
function Login({ authenticated, toggleAuthenticated }) {
  // useState & useForm
  const { register, handleSubmit } = useForm();

  let navigate = useNavigate();

  // TODO - When backend is live change this
  function onLoginSubmit(data) {
    if (data.username === "Ike" && data.password === "Test123") {
      toggleAuthenticated(!authenticated);
      navigate("/dashboard");
      console.log("123");
    }
  }

  return (
    <section className="login-section" aria-labelledby="login-title">
      <div className="login">
        <h1 id="login-title" className="login__title title--white text-center">
          Login
        </h1>
        <form className="login__form" onSubmit={handleSubmit(onLoginSubmit)}>
          <InputField
            inputId="username"
            inputName="Username"
            inputType="text"
            register={register}
            requiredInput={true}
            classNameLabel="login__form--label"
            classNameInput="login__form--input"
          />
          <InputField
            inputId="password"
            inputName="Password"
            inputType="password"
            register={register}
            requiredInput={true}
            classNameLabel="login__form--label"
            classNameInput="login__form--input"
          />
          <Button
            name="Login"
            type="submit"
            classNameButton="login__form--btn btn btn--blue"
          />
        </form>
      </div>
    </section>
  );
}

export default Login;
