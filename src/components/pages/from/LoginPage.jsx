/* eslint-disable no-extra-boolean-cast */
import { Link } from "react-router-dom";
import FieldSet from "../../form-component/FieldSet";
import Field from "../../form-component/Field";

import { useForm } from "react-hook-form";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitForm = (formData) => {
    console.log(formData);
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
                className={`w-full p-3 bg-[#030317] border  rounded-md focus:outline-none ${
                  !!errors.email
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
                className={`w-full p-3 bg-[#030317] border rounded-md focus:outline-none ${
                  !!errors.password
                    ? "border-red-300"
                    : "border-white/20 focus:border-indigo-500"
                }`}
              />
            </Field>
          </FieldSet>
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
