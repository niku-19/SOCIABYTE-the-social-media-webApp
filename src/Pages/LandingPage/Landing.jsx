import { ToastContainer } from "react-toastify";
import LeftSideBar from "../../Components/LeftSideBar/LeftSideBar";
import Loader from "../../Components/Loader/Loader";
import RightSideBar from "../../Components/RightSideBar/RightSideBar";
import { useLoader } from "../../Context/LoaderContext";
import HomePage from "../HomePage/HomePage";
import PhoneNav from "../../Components/Phone Nav/PhoneNav";

const Landing = () => {
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
      <div className="homepage__landing">
        {/* side bar  */}
        <LeftSideBar />
        {/* feed section  */}
        <HomePage />
        {/* side bar  */}
        <RightSideBar />
      </div>
      <PhoneNav />
    </>
  );
};

export default Landing;
