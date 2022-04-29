import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Logic/context";
import axios from "axios";

// Import components
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";

// Import scss
import "./Login.scss";

// Function
function Login() {
  // useState & useForm
  const { login } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
      login(result.data);
    } catch (error) {
      // BUG React hook form breaks on setError based on server response. handleSubmit doesn't work anymore. No fix found
      // if (error.response.status === 401) {
      //   setError("apiError", { type: "server", message: "custom message" });
      // }
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
          {/* // BUG - see Reach hook form bug setError */}
          {/* <span className="error-msg">
            {errors.apiError && errors.apiError.message}
          </span> */}
          <InputField
            inputId="username"
            inputName="Username"
            inputType="text"
            register={register}
            requiredInput={true}
            classNameLabel="login__form--label"
            classNameInput="login__form--input"
            errormsg={
              errors.username && (
                <span className="error-msg">Username is required</span>
              )
            }
          />
          <InputField
            inputId="password"
            inputName="Password"
            inputType="password"
            register={register}
            requiredInput={true}
            classNameLabel="login__form--label"
            classNameInput="login__form--input"
            errormsg={
              errors.username && (
                <span className="error-msg">Password is required</span>
              )
            }
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
