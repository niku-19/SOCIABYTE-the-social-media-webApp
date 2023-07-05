const INITIAL_STATE = {
  posts: [],
  postBySpecificUser: [],
  bookmarkedPosts: [],
  loading: false,
  error: null,
};

const PostReducer = (state, { type, payload }) => {
  switch (type) {
    case "GET_ALL_POSTS": {
      return {
        ...state,
        posts: payload,
      };
    }
    case "LIKE_DISLIKE_POST": {
      const updatedData = [...state.posts].map((eachPost) =>
        eachPost._id === payload._id
          ? {
              ...eachPost,
              likes: payload.likes,
              likedByUsers: payload.likedByUsers,
            }
          : eachPost
      );
      return {
        ...state,
        posts: updatedData,
      };
    }

    case "CREATE_COMMENT": {
      const updatedData = [...state.posts].map((eachPost) =>
        eachPost._id === payload._id
          ? {
              ...eachPost,
              comments: payload.comments,
            }
          : eachPost
      );
      return {
        ...state,
        posts: updatedData,
      };
    }

    case "DELETE_COMMENT": {
      const updatedData = [...state.posts].map((EachComment) =>
        EachComment._id === payload._id
          ? { ...EachComment, comments: payload.comments }
          : EachComment
      );
      return {
        ...state,
        posts: updatedData,
      };
    }

    // sorting post

    case "SORT_POST__BY__LATEST": {
      const sortedData = [...state.posts].sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });

      return {
        ...state,
        posts: sortedData,
      };
    }
    case "SORT_POST__BY__OLDEST": {
      const sortedData = [...state.posts].sort((a, b) => {
        return new Date(a.createdAt) - new Date(b.createdAt);
      });

      return {
        ...state,
        posts: sortedData,
      };
    }
    case "SORT_POST__BY__MOST-LIKED": {
      const sortedData = [...state.posts].sort((a, b) => b.likes - a.likes);

      return {
        ...state,
        posts: sortedData,
      };
    }

    case "GET_POST_BY_ID": {
      return {
        ...state,
        postBySpecificUser: payload,
      };
    }

    case "GET_BOOKMARKED_POST": {
      return {
        ...state,
        bookmarkedPosts: payload,
      };
    }

    case "REMOVE_BOOKMARKED_POST": {
      const updatedData = [...state.bookmarkedPosts].filter(
        (eachPost) => eachPost._id !== payload._id
      );
      return {
        ...state,
        bookmarkedPosts: updatedData,
      };
    }

    default:
      return state;
  }
};

export { INITIAL_STATE, PostReducer };
