import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

// Actions
export const createBook = createAsyncThunk(
  "book/createBook",
  async ({ updatedBookData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.createBook(updatedBookData);
      toast.success("Book Added Successfully");
      navigate("/dashboard");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getBooks = createAsyncThunk(
  "book/getBooks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getBooks();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getBook = createAsyncThunk(
  "book/getBook",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getBook(id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deletedBook = createAsyncThunk(
  "book/deletedBook",
  async ({ id, toast }, { rejectWithValue }) => {
    try {
      const response = await api.deleteBook(id);
      toast.success("Book Deleted Succesfully");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updatedBook = createAsyncThunk(
  "book/updatedBook",
  async ({ id, toast, updatedBookData, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.updateBook(updatedBookData, id);
      toast.success("Book Updated Succesfully");
      navigate("/");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const searchBooks = createAsyncThunk(
  "book/searchBooks",
  async (searchQuery, { rejectWithValue }) => {
    try {
      const response = await api.getBooksBySearch(searchQuery);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getBooksByTag = createAsyncThunk(
  "book/getBooksByTag",
  async (tag, { rejectWithValue }) => {
    try {
      const response = await api.getTagBooks(tag);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getBooksRelated = createAsyncThunk(
  "book/getBooksRelated",
  async (tags, { rejectWithValue }) => {
    try {
      const response = await api.getRelatedBooks(tags);
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
    tagBooks: [],
    relatedBooks: [],
    error: "",
    loading: false,
  },
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

    [getBooks.pending]: (state, action) => {
      state.loading = true;
    },
    [getBooks.fulfilled]: (state, action) => {
      state.loading = false;
      state.books = action.payload;
    },
    [getBooks.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    [getBook.pending]: (state, action) => {
      state.loading = true;
    },
    [getBook.fulfilled]: (state, action) => {
      state.loading = false;
      state.book = action.payload;
    },
    [getBook.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    [deletedBook.pending]: (state, action) => {
      state.loading = true;
    },
    [deletedBook.fulfilled]: (state, action) => {
      state.loading = false;
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.books = state.books.filter((item) => item._id !== id);
      }
    },
    [deletedBook.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    [updatedBook.pending]: (state, action) => {
      state.loading = true;
    },
    [updatedBook.fulfilled]: (state, action) => {
      state.loading = false;
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.books = state.books.map((item) =>
          item._id === id ? action.payload : item
        );
      }
    },
    [updatedBook.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    [searchBooks.pending]: (state, action) => {
      state.loading = true;
    },
    [searchBooks.fulfilled]: (state, action) => {
      state.loading = false;
      state.books = action.payload;
    },
    [searchBooks.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    [getBooksByTag.pending]: (state, action) => {
      state.loading = true;
    },
    [getBooksByTag.fulfilled]: (state, action) => {
      state.loading = false;
      console.log(action.books)
      state.tagBooks = action.payload;
    },
    [getBooksByTag.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    [getBooksRelated.pending]: (state, action) => {
      state.loading = true;
    },
    [getBooksRelated.fulfilled]: (state, action) => {
      state.loading = false;
      console.log(action.books)
      state.relatedBooks = action.payload;
    },
    [getBooksRelated.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default bookSlice.reducer;
