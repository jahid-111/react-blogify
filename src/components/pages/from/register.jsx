import { useForm } from "react-hook-form";
import FieldSet from "../../form-component/FieldSet";
import Field from "../../form-component/Field";
import { Link } from "react-router-dom";

const Register = () => {
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
          <FieldSet label="Registration">
            <Field label="First Name" error={errors.F_Name}>
              <input
                {...register("F_Name", { required: "First Name required" })}
                type="text"
                name="F_Name"
                id="F_Name"
                placeholder="First Name"
                className="w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500"
              />
            </Field>
            <Field label="Last Name (Optional)" error={errors.L_Name}>
              <input
                {...register("L_Name")}
                type="text"
                name="L_Name"
                id="L_Name"
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

            <Field label="Password" error={errors.password}>
              <input
                {...register("password", {
                  required: "Password required",
                  minLength: {
                    value: 8,
                    message: `Password Must be 8`,
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
