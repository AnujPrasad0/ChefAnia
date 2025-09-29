const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "recipeUser",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    recipe: {
      type: String,
      required: true,
    },
    favourite: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const recipeModel = mongoose.model("recipes", recipeSchema);

module.exports = recipeModel;
