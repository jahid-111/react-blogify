import { Link } from "react-router-dom";

const Error = () => {
  return (
    <section className=" ">
      <div className="w-full  px-4">
        <div className="mx-auto  h-screen max-w-[400px]  flex flex-col justify-center items-center  text-center">
          <h2 className="mb-2 text-[50px] font-bold leading-none text-white sm:text-[80px] md:text-[100px]">
            404
          </h2>
          <h4 className="mb-3 text-[22px] font-semibold leading-tight text-white">
            Oops! That page can’t be found
          </h4>
          <p className="mb-8 text-lg text-white">
            The page you are looking for it maybe deleted
          </p>
          <Link
            to="/"
            className="inline-block rounded-lg border border-white px-8 py-3 text-center text-base font-semibold text-white transition hover:bg-white hover:text-gray-500"
          >
            Go To Home
          </Link>
        </div>
      </div>
      {/* 
        <div className="absolute left-0 top-0 -z-10 flex h-full w-full items-center justify-between space-x-5 md:space-x-8 lg:space-x-14"></div> */}
      {/* FOR BG IMAGE*/}
    </section>
  );
};

export default Error;
