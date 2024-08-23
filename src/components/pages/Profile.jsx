import { useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import useFetch from "../../hooks/useFetch";
import ErrorData from "./error-page/ErrorData";
import LoadingFetch from "./error-page/LoadingFetch";
import ProfileUser from "./profile/ProfileUser";
import Timeline from "./profile/Timeline";
import { api } from "../../data-api";
import { toast } from "react-toastify";

const Profile = () => {
  const { id } = useParams();
  const { auth } = useAuth();

  const userId = id ?? auth?.user?.id;

  const {
    data: profile,
    loading: profileLoading,
    error: profileError,
  } = useFetch(`profile/${userId}`);

  const handleUserBio = async (newBio) => {
    try {
      const response = await api.patch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/profile/`,
        { bio: newBio },
        {
          headers: {
            Authorization: `Bearer ${auth.authToken}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Bio updated successfully!");
      }
    } catch (error) {
      toast.error("Failed to update bio.");
    }
  };

  return (
    <div className="container mx-auto max-w-[1020px] py-8">
      {profileLoading ? (
        <LoadingFetch />
      ) : profileError ? (
        <ErrorData />
      ) : (
        <>
          <ProfileUser
            profile={profile}
            handleUserBio={handleUserBio}
            auth={auth}
          />
          {/*To Timeline */}
          <Timeline profile={profile} auth={auth} />
        </>
      )}
    </div>
  );
};

export default Profile;
