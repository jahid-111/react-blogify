import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <>
      <div className=" h-screen flex flex-col gap-6 justify-center text-center  items-center">
        <h2 className=" text-5xl font-semibold text-red-500">Error</h2>
        <h3 className=" text-2xl font-semibold">Page Not Found</h3>

        <span className="  mt-10">
          <Link
            className=" underline text-green-600 text-xl hover:text-gray-500 "
            to={"home"}
          >
            Check Web For Your Content
          </Link>
        </span>
      </div>
    </>
  );
};

export default ErrorPage;
