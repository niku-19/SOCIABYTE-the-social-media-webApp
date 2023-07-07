/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
import { getAllUsersServices } from "../Services/Auth.services";
import {
  deleteAccountService,
  followNewUserService,
  getFriendsDetailsService,
  getProfileByIdService,
  profileService,
  unfollowUserService,
  userToBeFollowedService,
} from "../Services/Profile.services";
import { useLoader } from "./LoaderContext";

const userContext = createContext();

const UserProvider = ({ children }) => {
  const { showLoader, hideLoader } = useLoader();
  const [user, setUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [userToBeFollowed, setUserToBeFollowed] = useState([]);
  const [friends, setFriends] = useState([]);
  const [profile, setProfile] = useState(null);

  const getUser = (userData) => {
    setUser(userData);
  };

  const updatedUserDetails = (userData) => {
    setUser(userData);
  };

  const getAllUsers = async () => {
    try {
      showLoader("Getting All Users...");
      const res = await getAllUsersServices();
      if (res.status === 200) {
        const loggedInUser = res.data?.data.filter(
          (user) => user._id !== JSON.parse(localStorage.getItem("user"))._id
        );

        setAllUsers(loggedInUser);
        hideLoader();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getProfileById = async (id) => {
    try {
      showLoader("Getting Profile...");
      const res = await getProfileByIdService(id);
      if (res.status === 200) {
        setProfile(res.data.data);
        hideLoader();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const followUser = async (id) => {
    try {
      showLoader("Following User...");
      const res = await followNewUserService(id);
      if (res.status === 200) {
        const fetchProfile = await profileService(
          localStorage.getItem("token")
        );

        if (fetchProfile.status === 200) setUser(fetchProfile?.data?.data);
        getProfileById(id);
        getFriends();
        userToFollow();
        hideLoader();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const unFlollowUser = async (id) => {
    try {
      showLoader("Unfollowing User...");
      const res = await unfollowUserService(id);
      if (res.status === 200) {
        const fetchProfile = await profileService(
          localStorage.getItem("token")
        );

        if (fetchProfile.status === 200) {
          setUser(fetchProfile?.data?.data);
          getProfileById(id);
          getFriends();
          userToFollow();
          hideLoader();
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getFriends = async () => {
    try {
      showLoader("Getting Friends...");
      const res = await getFriendsDetailsService();
      console.log("🚀 ~ file: User-context.jsx:82 ~ getFriends ~ res:", res);
      if (res.status === 200) {
        setFriends(res?.data?.data);
        hideLoader();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const userToFollow = async () => {
    try {
      showLoader("Getting User to Follow...");
      const res = await userToBeFollowedService();
      if (res.status === 200) {
        setUserToBeFollowed(res?.data?.data);
        hideLoader();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteAccount = async () => {
    try {
      const res = await deleteAccountService();
      console.log(
        "🚀 ~ file: User-context.jsx:137 ~ deleteAccount ~ res:",
        res
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <userContext.Provider
      value={{
        getUser,
        user,
        updatedUserDetails,
        getAllUsers,
        allUsers,
        getProfileById,
        profile,
        followUser,
        getFriends,
        friends,
        userToFollow,
        userToBeFollowed,
        unFlollowUser,
        deleteAccount,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export const useUser = () => useContext(userContext);

export default UserProvider;
