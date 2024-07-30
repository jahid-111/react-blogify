import { useAuth } from "../../hooks/useAuth";
import useFetch from "../../hooks/useFetch";
import ProfileUser from "./profile/ProfileUser";
import Timeline from "./profile/Timeline";

const Profile = () => {
  const { auth } = useAuth();
  const {
    data: profile,
    loading: profileLoading,
    error: profileError,
  } = useFetch(`Profile/${auth?.user?.id}`);

  return (

    <div className="container mx-auto max-w-[1020px] py-8">

      <ProfileUser profile={profile} auth={auth}>  </ProfileUser>

      {/*To Timeline */}

      <Timeline profile={profile} auth={auth}></Timeline>
    </div>
  );
};

export default Profile;
