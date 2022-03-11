import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

// Import components
import InputField from "../../components/InputField/InputField";

// Import scss
import "./Login.scss";

// Function
function Login() {
  // useState & useForm
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({});

  function onLoginSubmit(data) {
    if (data.username === "Ike" && data.password === "Ike") {
      console.log("logged in");
    }
  }

  return (
    <section>
      <div id="login-container">
        <h1 className="font-white text-center">Login</h1>
        <form onSubmit={handleSubmit(onLoginSubmit)}>
          <InputField
            inputId="username"
            inputName="Username"
            inputType="text"
            register={register}
            requiredInput={true}
          />
          <InputField
            inputId="password"
            inputName="Password"
            inputType="password"
            register={register}
            requiredInput={true}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </section>
  );
}

export default Login;
