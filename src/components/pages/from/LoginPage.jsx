/* eslint-disable no-extra-boolean-cast */
import { Link, useNavigate } from "react-router-dom";
import FieldSet from "../../form-component/FieldSet";
import Field from "../../form-component/Field";
import axios from "axios";

import { useForm } from "react-hook-form";
import { useAuth } from "../../../hooks/useAuth";

const LoginPage = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const baseURL = import.meta.env.VITE_SERVER_BASE_URL;
  console.log("Base URL:", baseURL);
  const submitForm = async (formData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/auth/login`,
        formData
      );
      if (response.status === 200) {
        const { token, user } = response.data;

        if (token) {
          const authToken = token.accessToken;
          const refreshToken = token.refreshToken;
          // console.log("Auth", authToken, "====>>", "Refs", refreshToken);
          setAuth({ user, authToken, refreshToken });
          navigate("/");
          // save to DB
        }
      }
    } catch (error) {
      setError("root.random", {
        type: "random",
        message: `User Not Valid "${formData.email}" Mail`,
      });

      console.log(error);
    }
  };

  return (
    <section className=" w-full xl:w-8/12 xl:px-[0px]  mx-auto">
      <div className="w-full md:w-1/2  mx-auto bg-[#030317] p-8 rounded-md mt-12">
        <form onSubmit={handleSubmit(submitForm)}>
          <FieldSet label="Login">
            <Field label="Email" error={errors.email}>
              <input
                {...register("email", { required: "Email required" })}
                type="email"
                name="email"
                id="email"
                placeholder="Enter email"
                className={`w-full p-3 bg-[#030317] border  rounded-md focus:outline-none ${!!errors.email
                  ? " border-red-300"
                  : "border-white/20 focus:border-indigo-500"
                  }`}
              />
            </Field>
            <Field label="Password" error={errors.password}>
              <input
                {...register("password", {
                  required: "Password required",
                  minLength: {
                    value: 8,
                    message: `Password Must be 8`, //note it
                  },
                })}
                type="password"
                name="password"
                id="password"
                placeholder="Enter password"
                className={`w-full p-3 bg-[#030317] border rounded-md focus:outline-none ${!!errors.password
                  ? "border-red-300"
                  : "border-white/20 focus:border-indigo-500"
                  }`}
              />
            </Field>
          </FieldSet>

          <p className=" my-2 vibrate text-red-400">
            {" "}
            {errors.root?.random?.message}{" "}
          </p>
          <Field>
            <div className="my-6">
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
              >
                Login
              </button>
            </div>
          </Field>

          <p className="text-center">
            {" Don't have an account? "}
            <Link to="/register" className="text-indigo-600 hover:underline">
              Register
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
