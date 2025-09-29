import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../services/api";

export const setRecipe = createAsyncThunk(
  "recipe/setRecipe",
  async (content) => {
    const response = await axios.post("/api/recipe/", { content });
    return response.data;
  }
);

const initialState = {
  recipe: [],
  recipeLoading: false,
  recipeError: null,
};

const getrecipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setRecipe.pending, (state) => {
        state.recipeLoading = true;
        state.recipeError = null;
      })
      .addCase(setRecipe.rejected, (state, action) => {
        state.recipeLoading = false;
        state.recipeError = action.recipeError;
      })
      .addCase(setRecipe.fulfilled, (state, action) => {
        state.recipeLoading = false;
        state.recipe = action.payload;
      });
  },
});

export default getrecipeSlice.reducer;
