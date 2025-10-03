import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../services/api";

export const setexploreRecipe = createAsyncThunk(
  "recipe/setexploreRecipe",
  async (id) => {
    console.log(id);

    try {
      const response = await axios.get("/api/recipe/search/details", {
        params: { id },
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  recipe: [],
  loading: false,
  error: null,
};

const exploreRecipeSlice = createSlice({
  name: "exploreRecipe",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setexploreRecipe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setexploreRecipe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(setexploreRecipe.fulfilled, (state, action) => {
        state.loading = false;
        state.recipe = action.payload;
      });
  },
});

export default exploreRecipeSlice.reducer;
