import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Logic/context";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Import components
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";

// Import scss
import "./Login.scss";

// Function
function Login({ authenticated, toggleAuthenticated }) {
  // useState & useForm
  const { login } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();

  let navigate = useNavigate();

  // TODO - When backend is live change this
  async function postLogin(data) {
    try {
      const json = {
        username: data.username,
        password: data.password,
      };
      const result = await axios.post("http://localhost:8080/login", json, {
        Headers: { "Content-Type": "application/json" },
      });
      console.log(result);
      login(result.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <section className="login-section" aria-labelledby="login-title">
      <div className="login">
        <h1 id="login-title" className="login__title title--white text-center">
          Login
        </h1>
        <form className="login__form" onSubmit={handleSubmit(postLogin)}>
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
