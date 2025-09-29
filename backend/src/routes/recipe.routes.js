const express = require("express");
const recipeControllers = require("../controllers/recipe.controllers");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

// Recipe
router.post("/", recipeControllers.userRecipe);
router.post("/saved", authMiddleware.authUser, recipeControllers.saveRecipe);
router.get("/saved", authMiddleware.authUser, recipeControllers.getRecipe);
router.patch(
  "/saved/:id",
  authMiddleware.authUser,
  recipeControllers.updateRecipe
);
router.delete(
  "/saved/:id",
  authMiddleware.authUser,
  recipeControllers.deleteRecipe
);

router.get("/search", recipeControllers.getSearchRecipe);
router.get("/search/details", recipeControllers.getSearchRecipeDetails);

module.exports = router;
