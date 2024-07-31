import { useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import useFetch from "../../hooks/useFetch";
import ErrorData from "./error-page/ErrorData";
import LoadingFetch from "./error-page/LoadingFetch";
import ProfileUser from "./profile/ProfileUser";
import Timeline from "./profile/Timeline";

const Profile = () => {
  const { id } = useParams();
  const { auth } = useAuth();

  const userId = auth?.user?.id ?? id;
  const {
    data: profile,
    loading: profileLoading,
    error: profileError,
  } = useFetch(`profile/${userId}`);

  return (
    <div className="container mx-auto max-w-[1020px] py-8">
      {profileLoading ? (
        <LoadingFetch />
      ) : profileError ? (
        <ErrorData />
      ) : (
        <>
          <ProfileUser profile={profile} auth={auth} />
          {/*To Timeline */}
          <Timeline profile={profile} auth={auth} />
        </>
      )}
    </div>
  );
};

export default Profile;
