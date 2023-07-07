/* eslint-disable react/prop-types */
import { GiTireIronCross } from "react-icons/gi";
import { FiEdit2 } from "react-icons/fi";

import styles from "./EditProfile.module.css";
import { useUser } from "../../Context/User-context";
import { useRef, useState } from "react";
import { profileUpdateService } from "../../Services/Profile.services";
import { useLoader } from "../../Context/LoaderContext";
import Loader from "../../Components/Loader/Loader";

const EditProfile = ({ closeEditProfile, isAccountSeeting }) => {
  const { showLoader, hideLoader, loader } = useLoader();
  const { user, updatedUserDetails } = useUser();
  const avatarRef = useRef();
  const coverRef = useRef();

  const [updataedUser, setUpdataedUser] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    bio: user?.bio,
    avatar: user?.avatar,
    cover: user?.cover,
    email: user?.email,
    password: user?.password,
  });

  const handleUploadAvatar = () => {
    avatarRef.current.click();
  };

  const handleUpdateCover = () => {
    coverRef.current.click();
  };

  const handleAddAvatarImage = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = function () {
      setUpdataedUser({
        ...updataedUser,
        avatar: reader.result,
      });
    };
  };
  const handleAddCoverImage = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = function () {
      setUpdataedUser({
        ...updataedUser,
        cover: reader.result,
      });
    };
  };

  const handleUpdateProfileFunc = async (e, updatedData) => {
    e.preventDefault();
    try {
      showLoader("Updating Profile...");
      const res = await profileUpdateService(
        localStorage.getItem("token"),
        updatedData
      );
      if (res.status === 200) {
        updatedUserDetails(res?.data?.data);
        localStorage.setItem("user", JSON.stringify(res?.data?.data));
        hideLoader();
      }
    } catch (err) {
      alert(err.message);
    }
    closeEditProfile();
  };

  return (
    <>
      {loader.loader && <Loader />}
      <div
        className={styles.model__wrapper}
        onClick={() => closeEditProfile()}
      ></div>
      <div className={styles.model__container}>
        <div className={styles.edit__profile__header}>
          <h2>Edit Profile</h2>
          <GiTireIronCross
            className={styles.close__icons}
            onClick={() => closeEditProfile()}
          />
        </div>
        <div className={styles.form__container}>
          <form action="#">
            <div className={styles.cover__container}>
              <div className={styles.cover__image__container}>
                <p>To Update Cover Image Please Click on Cover Image</p>
                <img
                  src={updataedUser?.cover}
                  alt={updataedUser?.firstName}
                  onClick={handleUpdateCover}
                />
                <input
                  type="file"
                  name="cover"
                  id="cover"
                  ref={coverRef}
                  onChange={(e) => handleAddCoverImage(e)}
                  style={{ display: "none" }}
                />
              </div>
            </div>
            <div className={styles.avatar__container}>
              <div className={styles.image__container}>
                <img src={updataedUser?.avatar} alt="" />
              </div>
              <div className={styles.icons__container}>
                <FiEdit2 className={styles.icon} onClick={handleUploadAvatar} />
              </div>
              <input
                ref={avatarRef}
                type="file"
                name="avatar"
                id="avatar"
                style={{ display: "none" }}
                onChange={(e) => handleAddAvatarImage(e)}
              />
            </div>
            {!isAccountSeeting && (
              <div className={styles.form__group}>
                <label htmlFor="">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="First Name"
                  value={updataedUser?.firstName}
                  onChange={(e) => {
                    setUpdataedUser({
                      ...updataedUser,
                      firstName: e.target.value,
                    });
                  }}
                />
              </div>
            )}
            {!isAccountSeeting && (
              <div className={styles.form__group}>
                <label htmlFor="firstName">Last Name</label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="First Name"
                  value={updataedUser?.lastName}
                  onChange={(e) => {
                    setUpdataedUser({
                      ...updataedUser,
                      lastName: e.target.value,
                    });
                  }}
                />
              </div>
            )}
            {!isAccountSeeting && (
              <div className={styles.form__group}>
                <label htmlFor="firstName">Bio</label>
                <textarea
                  name="bio"
                  id="bio"
                  cols="30"
                  rows="10"
                  placeholder="Bio"
                  value={updataedUser?.bio}
                  onChange={(e) => {
                    setUpdataedUser({
                      ...updataedUser,
                      bio: e.target.value,
                    });
                  }}
                ></textarea>
              </div>
            )}
            <div className={styles.form__group}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={updataedUser?.email}
                onChange={(e) => {
                  setUpdataedUser({
                    ...updataedUser,
                    email: e.target.value,
                  });
                }}
              />
            </div>
            <div className={styles.form__group}>
              <label htmlFor="password">password</label>
              <input
                type="text"
                name="password"
                id="password"
                placeholder="Password"
                value={updataedUser?.password}
                onChange={(e) => {
                  setUpdataedUser({
                    ...updataedUser,
                    password: e.target.value,
                  });
                }}
              />
            </div>
            <button onClick={(e) => handleUpdateProfileFunc(e, updataedUser)}>
              update profile
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
