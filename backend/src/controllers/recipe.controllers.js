const recipeModel = require("../models/recipe.model");
const generateRecipe = require("../services/ai.service");
const axios = require("axios");

async function userRecipe(req, res) {
  // console.log(req.body.content);

  const request = req.body.content;
  try {
    const recipe = await generateRecipe(request);

    res.status(200).json({
      message: "Recipe made successfully",
      recipe: recipe,
    });
  } catch (err) {
    res.status(400).json({
      message: err,
    });
  }
}

async function saveRecipe(req, res) {
  const { title, recipe } = req.body;
  const user = req.user;

  try {
    const recipes = await recipeModel.create({
      user: user._id,
      title,
      recipe,
      favourite: false,
    });

    res.status(201).json({
      message: "Recipe saved successfully",
      recipes: {
        _id: recipes._id,
        user: recipes.user,
        title: recipes.title,
        recipe: recipes.recipe,
        favourite: recipes.favourite,
        createdAt: recipes.createdAt,
      },
    });
  } catch (err) {
    console.log(err);

    res.status(400).json({
      err,
    });
  }
}

async function getRecipe(req, res) {
  const user = req.user;

  const recipes = await recipeModel.find({ user: user._id });

  res.status(200).json({
    message: "Recipes retrieved successfully",
    recipes: recipes.map((recipe) => ({
      _id: recipe._id,
      user: recipe.user,
      title: recipe.title,
      recipe: recipe.recipe,
      favourite: recipe.favourite,
      createdAt: recipe.createdAt,
    })),
  });
}

async function updateRecipe(req, res) {
  const recipeId = req.params.id;
  const { favourite } = req.body;

  try {
    const updatedRecipe = await recipeModel.findOneAndUpdate(
      {
        _id: recipeId,
        user: req.user._id,
      },
      { $set: { favourite } },
      { new: true }
    );

    if (!updatedRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.status(200).json({
      message: "Recipe updated successfully",
      id: updatedRecipe._id,
      favourite: updatedRecipe.favourite,
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      message: "Failed to update recipe",
      error: err.message,
    });
  }
}

async function deleteRecipe(req, res) {
  const recipe = req.params.id;

  await recipeModel.deleteOne({ _id: recipe });

  res.status(200).json({
    message: "Recipe deleted successfully",
    id: recipe,
  });
}

async function getSearchRecipe(req, res) {
  try {
    const { query, offset = 0, number = 10 } = req.query;
    const response = await axios.get(
      "https://api.spoonacular.com/recipes/complexSearch",
      {
        params: {
          query,
          offset,
          number,
          addRecipeNutrition: false,
          apiKey: process.env.SPOONACULAR_API_KEY,
        },
      }
    );
    res.json(response.data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function getSearchRecipeDetails(req, res) {
  try {
    const { id } = req.body;
    console.log(id);
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/information`,
      {
        params: {
          includeNutrition: false,
          apiKey: process.env.SPOONACULAR_API_KEY,
        },
      }
    );
    res.json(response.data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

module.exports = {
  userRecipe,
  saveRecipe,
  getRecipe,
  updateRecipe,
  deleteRecipe,
  getSearchRecipe,
  getSearchRecipeDetails,
};
