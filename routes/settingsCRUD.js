const express = require('express');
const router = express.Router();
const Recipe=require("../models/settingsModel")

//get settings
router.get('/', (req, res) => {
    Recipe.find({docType:"settings"})
      .then((recipes) => {
        res.send(recipes);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

//update settings
router.put('/:id', (req, res) => {
    console.log(req.body)
    const { docType,cuisineArray } = req.body;
  
    Recipe.findByIdAndUpdate(
      req.params.id,
      { docType,cuisineArray },
      { new: true }
    )
      .then((setting) => {
        if (setting) {
          res.send(setting);
        } else {
          res.status(404).json({ error: 'Movie not found' });
        }
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  module.exports = router;