const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  author: { type: String, required: true,default:"self" },
  cuisine: { type: String, required: true },
  uploadedDate: { type: String, required: true, default:Date.now() },
  imageUrl: { type: String, required: true },
  ingredients: { type: [{ingredient: {type: String, required: true},quantity: {type: String, required: true},unit: {type: String, required: true}}],required:true },
  description: { type: String, required: true },
  cookTime:{ type: Number, required: true},
  servings:{ type: Number, required: true},
  steps:{type:[String],required:true}
});

const Recipe = mongoose.model('Recipes', recipeSchema);

module.exports = Recipe;