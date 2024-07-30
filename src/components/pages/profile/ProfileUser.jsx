import React from "react";

const ProfileUser = ({ profile, auth }) => {
  return (
    <div className="flex flex-col items-center py-8 text-center">
      <div className="relative mb-8 max-h-[180px] max-w-[180px] h-[120px] w-[120px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]">
        <div className="w-full h-full bg-orange-600 text-white grid place-items-center text-5xl rounded-full">
          <span>
            {" "}
            <img
              className=" rounded-full "
              src={`${import.meta.env.VITE_SERVER_BASE_URL}/uploads/avatar/${
                profile?.avatar
              }`}
              alt=""
            />
          </span>
        </div>

        <button className="grid place-items-center absolute bottom-0 right-0 h-7 w-7 rounded-full bg-slate-700 hover:bg-slate-700/80">
          <img alt="Edit" />
        </button>
      </div>
      <div>
        <h3 className="text-2xl font-semibold text-white lg:text-[28  px]">
          {auth?.user?.firstName} {auth?.user?.lastName}
        </h3>
        <p className="leading-[231%] lg:text-lg">
          {profile?.email && profile?.email}
        </p>
      </div>

      <div className="mt-4 flex items-start gap-2 lg:mt-6">
        <div className="flex-1">
          <span className="leading-[188%] text-gray-400 lg:text-lg">
            {profile?.bio ? profile?.bio : <h4> Create Bio</h4>}
          </span>
        </div>
        <button className="flex-center h-7 w-7 rounded-full">
          <img src="./assets/icons/edit.svg" alt="Edit" />
        </button>
      </div>
      <div className="w-3/4 border-b border-[#3F3F3F] py-6 lg:py-8"></div>
    </div>
  );
};

export default ProfileUser;
