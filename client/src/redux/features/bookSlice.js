import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

// Actions
export const createBook = createAsyncThunk(
  "book/createBook",
  async ({ updatedBookData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.createBook(updatedBookData);
      toast.success("Book Added Successfully");
      navigate("/");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const bookSlice = createSlice({
  name: "book",
  initialState: {
    book: {},
    books: [],
    userBooks: [],
    error: "",
    loading: false,
  },
  // reducers: {
  //   setUser: (state, action) => {
  //     state.user = action.payload;
  //   },
  //   setLogout: (state, action) => {
  //     state.user = null;
  //     localStorage.clear();
  //   },
  // },
  extraReducers: {
    [createBook.pending]: (state, action) => {
      state.loading = true;
    },
    [createBook.fulfilled]: (state, action) => {
      state.loading = false;
      state.books = [action.payload];
    },
    [createBook.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default bookSlice.reducer;
