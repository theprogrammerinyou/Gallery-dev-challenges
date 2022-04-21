import { createSlice } from '@reduxjs/toolkit';

const postSlice = createSlice({
  name: 'post',
  initialState: {
    savedFollowers: [],
    savedFollowing: [],
    savedPosts: [],
    userPosts: [],
    loader: false,
    bookmarkLoader: false,
    likeLoader: false,
    commentLoader: false
  },
  reducers: {
    toggleLoader(state, action) {
      state.loader = action.payload;
    },
    getPosts(state, action) {
      state.savedPosts = action.payload.posts;
    },
    getuserPosts(state, action) {
      state.userPosts = action.payload.userPosts;
    },
    toggleBookmarkLoader(state, action) {
      state.bookmarkLoader = action.payload;
    },
    toggleLikeLoader(state, action) {
      state.likeLoader = action.payload;
    },
    toggleCommentLoader(state, action) {
      state.commentLoader = action.payload;
    }
  }
});

export const postActions = postSlice.actions;

export default postSlice;
