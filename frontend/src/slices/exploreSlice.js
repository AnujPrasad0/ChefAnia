import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../services/api";

export const getExploreRecipe = createAsyncThunk(
  "recipe/getexplorerecipe",
  // payload should be an object: { search, offset = 0, number = 10 }
  async ({ search, offset = 0, number = 10 }) => {
    try {
      const response = await axios.get("/api/recipe/search", {
        params: { query: search, offset, number },
      });
      // return data + offset + search so reducer can decide append vs reset
      return { data: response.data, offset, search };
    } catch (err) {
      console.log(err);
    }
  }
);

const initialState = {
  recipes: [], // flattened array of recipe objects (results)
  loading: false,
  error: null,
  totalResults: 0, // Spoonacular's totalResults (if provided)
  lastSearch: "", // last query used (to detect new searches)
};

const exploreSlice = createSlice({
  name: "exploreRecipes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getExploreRecipe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getExploreRecipe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(getExploreRecipe.fulfilled, (state, action) => {
        state.loading = false;
        const { data, offset, search } = action.payload;
        const newResults = (data && data.results) || [];

        // if new search (offset 0 or search changed) => reset
        if (offset === 0 || search !== state.lastSearch) {
          state.recipes = newResults;
        } else {
          // append
          state.recipes = [...state.recipes, ...newResults];
        }

        // totalResults if spoonacular provides it (fallback to current length)
        state.totalResults = data?.totalResults ?? state.recipes.length;
        state.lastSearch = search;
      });
  },
});

export default exploreSlice.reducer;
