/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer } from "react";
import {
  bookmarkPostServices,
  commentPostServices,
  createPostServices,
  deleteCommentPostServices,
  deletePostServices,
  editPostServices,
  getAllPostServices,
  getBookmarkPostServices,
  getPostByIdServices,
  likePostServices,
  removoBookmarkPostServices,
} from "../Services/post.services";
import { INITIAL_STATE, PostReducer } from "../Reducers/Post-reducer";
import { useLoader } from "./LoaderContext";
import { useToaster } from "./toast";

const PostContext = createContext(null);

const PostContextProvider = ({ children }) => {
  const { showLoader, hideLoader } = useLoader();
  const { successToast } = useToaster();
  //errorToast, warrningToast
  const [postData, dispatch] = useReducer(PostReducer, INITIAL_STATE);

  //create post calling the service
  const createNewPost = async (data) => {
    try {
      const res = await createPostServices(data);
      if (res.status === 201) {
        console.log(res);
        hideLoader();
        successToast("Post Created Successfully");
      }
    } catch (err) {
      console.log(err);
    }
  };

  //get all post calling the service
  const getAllPosts = async () => {
    try {
      showLoader("Getting All Posts...");
      const res = await getAllPostServices();
      if (res.status === 200) {
        dispatch({ type: "GET_ALL_POSTS", payload: res.data?.postData });
        hideLoader();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getPostById = async (id) => {
    try {
      showLoader("Getting Post...");
      const res = await getPostByIdServices(id);
      if (res.status === 200) {
        dispatch({ type: "GET_POST_BY_ID", payload: res.data?.postData });
        hideLoader();
      }
    } catch (err) {
      console.log(err);
    }
  };

  //edit post calling the service and dispatching the action

  const editPostfun = async (postId, data) => {
    try {
      const res = await editPostServices(postId, data);
      console.log(res);
      if (res.status === 200) {
        getAllPosts();
        hideLoader();
        successToast("Post Edited Successfully");
      }
    } catch (err) {
      console.log(err);
    }
  };

  //like post

  const likePost = async (id) => {
    try {
      const res = await likePostServices(id);
      console.log("🚀 ~ file: Post-context.jsx:91 ~ likePost ~ res:", res);
      if (res.status === 200) {
        dispatch({
          type: "USER__LIKED__POST",
          payload: res.data.postData,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  //create commet calling the service and dispatching the action

  const createComment = async (postId, commnet) => {
    try {
      const res = await commentPostServices(postId, commnet);
      if (res.status === 200) {
        dispatch({ type: "CREATE_COMMENT", payload: res.data?.postData });
        hideLoader();
        successToast("Comment Created Successfully");
      }
    } catch (err) {
      console.log(err);
    }
  };

  //delete comment calling the service and dispatching the action

  const deleteComment = async (postId, commentId) => {
    try {
      const res = await deleteCommentPostServices(postId, commentId);
      if (res.status === 200) {
        dispatch({ type: "DELETE_COMMENT", payload: res.data?.postData });
        hideLoader();
        successToast("Comment Deleted Successfully");
      }
    } catch (err) {
      console.log(err);
    }
  };

  //bookmark post calling the service and dispatching the action

  const bookmarkPost = async (postId) => {
    const token = localStorage.getItem("token");
    try {
      const res = await bookmarkPostServices(postId, token);
      if (res.status === 200) {
        console.log(res);
        showLoader();
        successToast("Post Bookmarked Successfully");
      }
    } catch (err) {
      console.log(err);
    }
  };

  //get Bookmarked post calling the service and dispatching the action

  const getBookmarkedPost = async () => {
    try {
      showLoader("Getting Bookmarked Post...");
      const res = await getBookmarkPostServices();
      if (res.status === 200) {
        dispatch({
          type: "GET_BOOKMARKED_POST",
          payload: res.data?.data,
        });
        hideLoader();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const removePostFromBookmark = async (postId) => {
    try {
      showLoader("Removing Post From Bookmark...");
      const res = await removoBookmarkPostServices(postId);
      if (res.status === 200) {
        dispatch({
          type: "REMOVE_BOOKMARKED_POST",
          payload: res.data?.data,
        });
        hideLoader();
      }
    } catch (err) {
      console.log(err);
    }
  };

  //delet post calling the service and dispatching the action

  const deletePost = async (postId) => {
    try {
      showLoader("Deleting Post...");
      const res = await deletePostServices(postId);
      if (res.status === 200) {
        console.log(res);
        hideLoader();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <PostContext.Provider
      value={{
        createNewPost,
        getAllPosts,
        deletePost,
        postData,
        dispatch,
        editPostfun,
        createComment,
        deleteComment,
        getPostById,
        bookmarkPost,
        likePost,
        getBookmarkedPost,
        removePostFromBookmark,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePostData = () => useContext(PostContext);

export default PostContextProvider;
