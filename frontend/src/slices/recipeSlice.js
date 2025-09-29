import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../services/api";

export const saveRecipe = createAsyncThunk(
  "recipe/save",
  async ({ title, recipe }) => {
    const response = await axios.post(
      "/api/recipe/saved",
      {
        title: title,
        recipe: recipe,
      },
      { withCredentials: true }
    );
    return response.data;
  }
);

export const fetchRecipe = createAsyncThunk("recipe/fetch", async () => {
  const response = await axios.get("/api/recipe/saved", {
    withCredentials: true,
  });
  return response.data;
});

export const updateRecipe = createAsyncThunk(
  "recipe/update",
  async ({ id, favourite }) => {
    const response = await axios.patch(
      `/api/recipe/saved/${id}`,
      { favourite: favourite },
      {
        withCredentials: true,
      }
    );
    return response.data;
  }
);

export const deleteRecipe = createAsyncThunk("recipe/delete", async (id) => {
  const response = await axios.delete(
    `/api/recipe/saved/${id}`,

    {
      withCredentials: true,
    }
  );
  return response.data;
});

const initialState = {
  recipes: [],
  loading: false,
  error: null,
};

const recipeSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(saveRecipe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveRecipe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(saveRecipe.fulfilled, (state, action) => {
        state.loading = false;
        state.recipes.push(action.payload.recipes);
      })
      .addCase(fetchRecipe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecipe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchRecipe.fulfilled, (state, action) => {
        state.recipes = action.payload.recipes;
        state.loading = false;
      })
      .addCase(deleteRecipe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteRecipe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteRecipe.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload.id);

        state.recipes = state.recipes.filter(
          (item) => item._id !== action.payload.id
        );
      })
      .addCase(updateRecipe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRecipe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateRecipe.fulfilled, (state, action) => {
        state.loading = false;
        const { id, favourite } = action.payload;

        const recipeIndex = state.recipes.findIndex((item) => item._id === id);

        if (recipeIndex !== -1) {
          state.recipes[recipeIndex].favourite = favourite;
        }
      });
  },
});

export default recipeSlice.reducer;
