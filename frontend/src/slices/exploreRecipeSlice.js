import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../services/api";

export const setexploreRecipe = createAsyncThunk(
  "recipe/setexploreRecipe",
  async (id) => {
    const response = await axios.post("/api/recipe/search/details", { id });
    return response.data;
  }
);

const initialState = {
  exploreRecipe: [],
  recipeLoading: false,
  recipeError: null,
};

const exploreRecipeSlice = createSlice({
  name: "exploreRecipe",
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

export default exploreRecipeSlice.reducer;
