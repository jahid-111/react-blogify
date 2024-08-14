import { useForm } from "react-hook-form";
import FieldSet from "../../form-component/FieldSet";
import Field from "../../form-component/Field";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../../data-api";
import { toast } from "react-toastify";
const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitForm = async (formData) => {
    console.log(formData);
    try {
      const response = await api.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/auth/register`,
        formData
      );
      // console.log(response);
      if (response.status === 201) {
        toast.success("Congratulations! Registration successful.");
        navigate("/login");
      }
    } catch (error) {
      // console.error(error);
      if (error.response.status === 500) {
        toast.error("Something went wrong. Please try again later.");
      }
      if (error.response.data.error) {
        toast.warn(error.response.data.error);
      }
    }
  };

  return (
    <section className=" w-full xl:w-8/12 xl:px-[0px]  mx-auto">
      <div className="w-full md:w-1/2  mx-auto bg-[#030317] p-8 rounded-md mt-12">
        <form onSubmit={handleSubmit(submitForm)}>
          <FieldSet label="Registration">
            <Field label="First Name" error={errors.firstName}>
              <input
                {...register("firstName", { required: "First Name required" })}
                type="text"
                name="firstName"
                id="firstName"
                placeholder="First Name"
                className="w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500"
              />
            </Field>
            <Field label="Last Name (Optional)" error={errors.lastName}>
              <input
                {...register("lastName")}
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Last Name"
                className="w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500"
              />
            </Field>
            <Field label="Email" error={errors.email}>
              <input
                {...register("email", { required: "Email required" })}
                type="email"
                name="email"
                id="email"
                placeholder="Enter email"
                className="w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500"
              />
            </Field>

            <Field label="password" error={errors.password}>
              <input
                {...register("password", {
                  required: "password required",
                  minLength: {
                    value: 8,
                    message: `password Must be 8`,
                  },
                })}
                type="password"
                name="password"
                id="password"
                placeholder="Enter password"
                className="w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500"
              />
            </Field>

            <div className=" flex justify-between gap-2">
              <Field label="Age" error={errors.age}>
                <input
                  {...register("age", {
                    required: "Age required",
                    minLength: {
                      message: `Age Must be 15+`,
                    },
                  })}
                  type="number"
                  name="age"
                  id="age"
                  placeholder="age"
                  className="w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500 "
                />
              </Field>
              <Field label="Sex (Optional)" error={errors.sex}>
                <input
                  {...register("sex")}
                  type="text"
                  name="sex"
                  id="sex"
                  placeholder="sex"
                  className="w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500"
                />
              </Field>
            </div>
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
            {"Already have account? "}
            <Link to="/login" className="text-indigo-600 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Register;
