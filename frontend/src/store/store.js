import { configureStore } from "@reduxjs/toolkit";
import recipeReducer from "../slices/recipeSlice";
import getrecipeReducer from "../slices/getrecipeSlice";
import exploreReducer from "../slices/exploreSlice";
import exploreDetailsReducer from "../slices/exploreRecipeSlice";
import authReducer from "../slices/authSlice";

const store = configureStore({
  reducer: {
    savedrecipes: recipeReducer,
    recipe: getrecipeReducer,
    exploreRecipe: exploreReducer,
    exploreRecipeDetails: exploreDetailsReducer,
    auth: authReducer,
  },
});

export default store;
