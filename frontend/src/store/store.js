import { configureStore } from "@reduxjs/toolkit";
import recipeReducer from "../slices/recipeSlice";
import getrecipeReducer from "../slices/getrecipeSlice";
import exploreReducer from "../slices/exploreSlice";

const store = configureStore({
  reducer: {
    savedrecipes: recipeReducer,
    recipe: getrecipeReducer,
    exploreRecipe: exploreReducer,
  },
});

export default store;
