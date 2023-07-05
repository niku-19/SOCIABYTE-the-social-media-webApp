/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import LeftSideBar from "../../Components/LeftSideBar/LeftSideBar";
import RightSideBar from "../../Components/RightSideBar/RightSideBar";
import { profileService } from "../../Services/Profile.services";
import UserProfile from "../../Components/Profile/UserProfile";
import { useUser } from "../../Context/User-context";
import { usePostData } from "../../Context/Post-context";

import styles from "./Profile.module.css";
import { useLoader } from "../../Context/LoaderContext";
import Loader from "../../Components/Loader/Loader";
import { ToastContainer } from "react-toastify";
import PhoneNav from "../../Components/Phone Nav/PhoneNav";

const ProfilePage = () => {
  const { getUser } = useUser();
  const { getPostById } = usePostData();
  const { loader, showLoader, hideLoader } = useLoader();
  useEffect(() => {
    (async () => {
      try {
        showLoader("Fetching Profile...");
        const res = await profileService(localStorage.getItem("token"));
        if (res.status === 200) {
          getUser(res?.data?.data);
          getPostById(res?.data?.data?._id);
          hideLoader();
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <>
      {loader.loader && <Loader />}
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className={styles.profile__page__container}>
        {/* side bar  */}
        <LeftSideBar />
        {/* user Profile  */}
        <div className={styles.feed__container}>
          <UserProfile />
        </div>
        {/* side bar  */}
        <RightSideBar isShowFriend={true} />
      </div>
      <PhoneNav />
    </>
  );
};

export default ProfilePage;
