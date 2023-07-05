import UserSetting from "../../Common/UserSetting/UserSetting";
import LeftSideBar from "../../Components/LeftSideBar/LeftSideBar";
import PhoneNav from "../../Components/Phone Nav/PhoneNav";
import RightSideBar from "../../Components/RightSideBar/RightSideBar";

import styles from "./Setting.module.css";

const Setting = () => {
  return (
    <>
      <div className={styles.setting__page__container}>
        {/* side bar  */}
        <LeftSideBar />
        {/* feed section  */}
        <div className={styles.setting__container}>
          <UserSetting />
        </div>
        {/* side bar  */}
        <RightSideBar />
      </div>
      <PhoneNav />
    </>
  );
};

export default Setting;
