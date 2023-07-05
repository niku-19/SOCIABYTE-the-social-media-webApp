/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import FeedCard from "../../Common/FeedCard/FeedCard";
import styles from "./FeedList.module.css";
import { usePostData } from "../../Context/Post-context";
const FeedList = () => {
  const { getAllPosts, postData, bookmarkPost } = usePostData();

  useEffect(() => {
    getAllPosts();
  }, []);

  const handleAddToBookMark = async (id) => {
    console.log("clicked");
    await bookmarkPost(id);
    getAllPosts();
  };

  return (
    <div className={styles.feed__list__container}>
      {postData?.posts.length > 0 ? (
        postData?.posts?.map((eachPost) => {
          return (
            <FeedCard
              key={eachPost._id}
              DATA={eachPost}
              handleAddToBookMark={handleAddToBookMark}
            />
          );
        })
      ) : (
        <h1>No Posts</h1>
      )}
    </div>
  );
};

export default FeedList;
