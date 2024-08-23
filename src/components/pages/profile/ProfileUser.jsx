/* eslint-disable react/prop-types */

import { useRef, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { FaUserEdit } from "react-icons/fa";
import { api } from "../../../data-api";
import { toast } from "react-toastify";

const ProfileUser = ({ profile, auth, handleUserBio }) => {
  const [toggle, setToggle] = useState(false);
  const [bio, setBio] = useState(profile?.bio);

  const user = auth?.user?.id === profile?.id;
  const fileRef = useRef(null);

  const handleGetBioValue = (value) => {
    setBio(value);
    console.log(value);
  };

  const callFileInput = (e) => {
    e.preventDefault();
    fileRef.current.addEventListener("change", handleImageUpdate);
    fileRef.current.click();
  };

  const handleImageUpdate = async () => {
    const formData = new FormData();
    for (const file of fileRef.current.files) {
      formData.append("avatar", file);
      console.log(file);
    }

    try {
      const response = await api.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/profile/avatar`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${auth.authToken}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success(" Successfully Updated Profile Image");
      }
      console.log(response);
    } catch (error) {
      if (error.response.status === 404) {
        toast.error("Failed To Update Image");
      }
    }
  };

  return (
    <div className="flex flex-col items-center py-8 text-center">
      <div className="relative mb-8 max-h-[180px] max-w-[180px] h-[120px] w-[120px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]">
        <div className="">
          <img
            className="  h-32  w-32 rounded-full "
            src={`${import.meta.env.VITE_SERVER_BASE_URL}/uploads/avatar/${
              profile?.avatar
            }`}
            alt=""
          />
        </div>

        <button
          onClick={callFileInput}
          type="button"
          className="grid place-items-center absolute bottom-0 right-0 h-7 w-7 rounded-full bg-slate-700 hover:bg-slate-700/80"
        >
          <FaUserEdit />
        </button>

        <input ref={fileRef} type="file" hidden />
      </div>
      <div>
        <h3 className="text-2xl font-semibold text-white lg:text-[28  px]">
          {profile?.firstName} {profile?.lastName}
        </h3>
        <p className="leading-[231%] lg:text-lg">
          {profile?.email ?? profile?.email}
        </p>
      </div>

      <div className="mt-4 flex  justify-center items-center gap-2 lg:mt-6">
        <div className="flex-1">
          {user && (
            <button title="Edit Bio" onClick={() => setToggle((prv) => !prv)}>
              <BiEdit />
            </button>
          )}

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
                  setToggle((prvToggle) => !prvToggle), handleUserBio(bio);
                }}
                className=" bg-green-600 py-1 px-3 hover:bg-green-500 rounded-sm"
              >
                Submit
              </button>
            </>
          ) : (
            <>
              <h3 className=" font-semibold underline text-gray-200">BIO: </h3>
              <h5 className=" text-yellow-700 "> {bio}</h5>
            </>
          )}
        </div>
      </div>
      <div className="w-3/4 border-b border-[#3F3F3F] py-6 lg:py-8"></div>
    </div>
  );
};

export default ProfileUser;
// w-full h-full bg-orange-600 text-white grid place-items-center text-5xl rounded-full
