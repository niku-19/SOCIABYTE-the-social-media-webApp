import FeedCard from "../../Common/FeedCard/FeedCard";
import { useLoader } from "../../Context/LoaderContext";
import { usePostData } from "../../Context/Post-context";
import Loader from "../Loader/Loader";

import styles from "./BookMarkList.module.css";

const BookMarkList = () => {
  const { postData } = usePostData();
  const { loader } = useLoader();
  return (
    <>
      {loader.loader && <Loader />}
      <div className={styles.bookmark__list__container}>
        {postData?.bookmarkedPosts.length > 0 ? (
          postData?.bookmarkedPosts?.map((eachPost) => {
            const DATA = {
              ...eachPost?.post_id,
              userId: eachPost?.user_id,
            };
            const isLiked = eachPost.post_id.likes.includes(
              JSON.parse(localStorage.getItem("user"))._id
            );

            const isBookMarked =
              eachPost?.user_id._id ===
              JSON.parse(localStorage.getItem("user"))._id;

            return (
              <FeedCard
                key={eachPost._id}
                isLiked={isLiked ? true : false}
                isBookMarked={isBookMarked ? true : false}
                DATA={DATA}
              />
            );
          })
        ) : (
          <div className={styles.no__book__mark_post}>
            <h1>No Bookmarks</h1>
          </div>
        )}
      </div>
    </>
  );
};

export default BookMarkList;
