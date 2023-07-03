const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  docType: { type: String, required: true, default:"settings" },
  cuisineArray: { type: [String], required: true },
});

const Settings = mongoose.model('Recipesettings', settingsSchema);

module.exports = Settings;