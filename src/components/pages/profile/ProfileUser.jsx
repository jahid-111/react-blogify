/* eslint-disable react/prop-types */

import { useState } from "react";
import { BiEdit } from "react-icons/bi";

const ProfileUser = ({ profile, auth, handleUserBio }) => {
  const [toggle, setToggle] = useState(false);

  const [bio, setBio] = useState(profile?.bio);

  const handleGetBioValue = (value) => {
    setBio(value);
    console.log(value);
  };

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
          {profile?.email ?? profile?.email}
        </p>
      </div>

      <div className="mt-4 flex  justify-center items-center gap-2 lg:mt-6">
        <div className="flex-1">
          <button onClick={() => setToggle((prv) => !prv)}>
            <BiEdit />
          </button>

          {toggle ? (
            <>
              <textarea
                className="bg-gray-900 text-white p-2 rounded-md w-full h-28 border  focus:outline-none focus:ring-2 focus:gray-green-600 "
                onChange={(e) => handleGetBioValue(e.target.value)}
                type="text"
                value={bio}
              ></textarea>

              <button
                onClick={() => {
                  setToggle((p) => !p), handleUserBio(bio);
                }}
                className=" bg-green-600 py-1 px-3 hover:bg-green-500 rounded-sm"
              >
                Submit
              </button>
            </>
          ) : (
            <>
              <h3>{bio}</h3>
            </>
          )}
        </div>
      </div>
      <div className="w-3/4 border-b border-[#3F3F3F] py-6 lg:py-8"></div>
    </div>
  );
};

export default ProfileUser;
