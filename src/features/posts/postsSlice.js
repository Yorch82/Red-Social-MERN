import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postsService from "./postsService";

const initialState = {
  posts: [],
  isLoading: false,
  post: {},
  formData: {},  
  comments:[]
};

export const getAll = createAsyncThunk("posts/getAll", async (thunkAPI) => {
  try {
    return await postsService.getAll();
  } catch (error) {
    const message = error.response.data;
    return thunkAPI.rejectWithValue(message);
  }
});

export const getById = createAsyncThunk(
  "posts/getById",
  async (_id, thunkAPI) => {
    try {
      return await postsService.getById(_id);
    } catch (error) {
      const message = error.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getPostByName = createAsyncThunk(
  "posts/getByName",
  async (postTitle, thunkAPI) => {
    try {
      return await postsService.getPostByName(postTitle);
    } catch (error) {
      const message = error.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (_id, thunkAPI) => {
    try {
      return await postsService.deletePost(_id);
    } catch (error) {
      const message = error.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (post, thunkAPI) => {
    try {
      return await postsService.createPost(post);
    } catch (error) {
      const message = error.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const like = createAsyncThunk("post/like", async (_id, thunkAPI) => {
  try {
    return await postsService.like(_id);
  } catch (error) {
    const message = error.response.data;
    return thunkAPI.rejectWithValue(message);
  }
});

export const dislike = createAsyncThunk(
  "post/dislike",
  async (_id, thunkAPI) => {
    try {
      return await postsService.dislike(_id);
    } catch (error) {
      const message = error.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);



export const editPost = createAsyncThunk("post/editPost", async (post, thunkAPI) => {
  try {
    return await postsService.editPost(post);
  } catch (error) {
    const message = error.response.data;
    return thunkAPI.rejectWithValue(message);
  }
});

export const addComment = createAsyncThunk("post/addComment", async (comment, thunkAPI) => {
  try {
    return await postsService.addComment(comment)
  }catch (error) {
    const message = error.response.data;
    return thunkAPI.rejectWithValue(message);
  }
});

export const likeComment = createAsyncThunk("comment/like", async (_id, thunkAPI) => {
  try {
      return await postsService.likeComment(_id);
  } catch (error) {
      const message = error.response.data;
      return thunkAPI.rejectWithValue(message);
  }
});

export const dislikeComment = createAsyncThunk("comment/dislike", async (_id, thunkAPI) => {
  try {
      return await postsService.dislikeComment(_id);
  } catch (error) {
      const message = error.response.data;
      return thunkAPI.rejectWithValue(message);
  }
});



export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAll.fulfilled, (state, action) => {
        state.posts = action.payload;
      })
      .addCase(getAll.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getById.fulfilled, (state, action) => {
        state.post = action.payload;
      })
      .addCase(getPostByName.fulfilled, (state, action) => {
        state.posts = action.payload;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        console.log(action.payload.post._id)
        state.posts = state.posts.filter((post) => post._id !== +action.payload.post._id);
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts = [action.payload.post , ...state.posts ];
      })
      .addCase(like.fulfilled, (state, action) => {
        const posts = state.posts.map((element) => {
          if (element._id === action.payload._id) {
            element = action.payload;
          }
          return element;
        });
        state.posts = posts;
      })
      .addCase(dislike.fulfilled, (state, action) => {
        const posts = state.posts.map((element) => {
          if (element._id === action.payload._id) {
            element = action.payload;
          }
          return element;
        });
        state.posts = posts;
      })
      .addCase(editPost.fulfilled, (state, action) => {
        
        const posts = state.posts.map((element) => {
          if (element._id === action.payload.post._id) {
            element = action.payload.post;
          }
          return element
      })
      state.posts = posts
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.comments =  action.payload;
      }) 
      .addCase(likeComment.fulfilled, (state, action) => {
        console.log(state.comments)
        const comments = state.comments?.map((element) => {
          if (element._id === action.payload._id) {
            element = action.payload;
          }
          return element;
        });
        state.comments = comments;
      })
      .addCase(dislikeComment.fulfilled, (state, action) => {
        const comments = state.comments.map((element) => {
          if (element._id === action.payload._id) {
            element = action.payload;
          }
          return element;
        });
        state.comments = comments;
      })
               
  },
});

export const { reset } = postsSlice.actions;
export default postsSlice.reducer;
