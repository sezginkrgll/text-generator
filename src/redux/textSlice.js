// redux
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// axios
import axios from "axios";

export const fetchText = createAsyncThunk(
  "characters/getCharacters",
  async (text) => {
    const res = await axios(
      `https://baconipsum.com/api/?type=all-meat&start-with-lorem=1&paras=${text.paragraphs}&format=${text.format}`
    );
    console.log(text.paragraphs);
    console.log(text.format);
    return res.data;
  }
);

export const textSlice = createSlice({
  name: "text",
  initialState: {
    items: "",
    status: "idle",
  },
  reducers: {},
  extraReducers: {
    [fetchText.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchText.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = "succeeded";
    },
    [fetchText.rejected]: (state, action) => {
      state.status = "faild";
      state.error = action.error.message;
    },
  },
});

export default textSlice.reducer;
