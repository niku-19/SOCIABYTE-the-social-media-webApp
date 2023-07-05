import FeedList from "../../Components/Feed List/FeedList";
import LeftSideBar from "../../Components/LeftSideBar/LeftSideBar";
import RightSideBar from "../../Components/RightSideBar/RightSideBar";
import Sort from "../../Common/Sort/Sort";

import styles from "./Explore.module.css";
import { useLoader } from "../../Context/LoaderContext";
import Loader from "../../Components/Loader/Loader";
import { ToastContainer } from "react-toastify";
import PhoneNav from "../../Components/Phone Nav/PhoneNav";

const Explore = () => {
  const { loader } = useLoader();
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
      <div className={styles.explore__container}>
        {/* side bar  */}
        <LeftSideBar />
        {/* feed section  */}
        <div className={styles.feed__container}>
          <Sort />
          <FeedList />
        </div>
        {/* side bar  */}
        <RightSideBar />
      </div>
      <PhoneNav />
    </>
  );
};

export default Explore;