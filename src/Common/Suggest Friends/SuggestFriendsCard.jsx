/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import styles from "./SuggestFriendsCard.module.css";
import { useUser } from "../../Context/User-context";

const SuggestFriendsCard = ({ eachUser, toBeFolled }) => {
  const { followUser, unFlollowUser } = useUser();

  const handleFollowUser = (userId) => {
    followUser(userId);
  };

  const handleUnFollowUser = (userId) => {
    unFlollowUser(userId);
  };

  return (
    <Link to={`/profile/${eachUser._id}`}>
      <div
        className={styles.profile__card__container}
        onClick={() =>
          toBeFolled
            ? handleFollowUser(eachUser._id)
            : handleUnFollowUser(eachUser._id)
        }
      >
        <div className={styles.image__container}>
          <img src={eachUser?.avatar} alt={eachUser?.firstName} />
        </div>
        <div className={styles.user__name__container}>
          <h3>{eachUser?.firstName}</h3>
        </div>
        <div className={styles.icons__container}>
          {" "}
          {toBeFolled ? "➕" : "➖"}
        </div>
      </div>
    </Link>
  );
};

export default SuggestFriendsCard;
