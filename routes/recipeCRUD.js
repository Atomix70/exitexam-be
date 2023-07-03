const express = require('express');
const router = express.Router();
const Recipe=require("../models/recipeModel")


// Create a Movie
router.post('/', (req, res) => {
    console.log("new recipe incoming")
  const { name,author,cuisine,uploadedDate,imageUrl,steps,description,cookTime,servings,ingredients } = req.body;
  const newRecipe = new Recipe({ name,author,cuisine,uploadedDate,imageUrl,steps,description,cookTime,servings,ingredients });

  newRecipe.save()
    .then((recipe) => {
      res.send(recipe);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// Get all Movies
router.get('/', (req, res) => {
  Recipe.find()
    .then((recipes) => {
      res.send(recipes);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// Get a single movie
router.get('/:id', (req, res) => {
    Recipe.findById(req.params.id)
    .then((recipe) => {
      if (recipe) {
        res.send(recipe).status(200);
      } else {
        res.status(404).json({ error: 'Movie not found' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// Update a Movie
router.put('/:id', (req, res) => {
  const { name,author,cuisine,uploadedDate,imageUrl,steps,description,cookTime,servings,ingredients } = req.body;

  Recipe.findByIdAndUpdate(
    req.params.id,
    { name,author,cuisine,uploadedDate,imageUrl,steps,description,cookTime,servings,ingredients },
    { new: true }
  )
    .then((recipe) => {
      if (recipe) {
        res.send(recipe);
      } else {
        res.status(404).json({ error: 'Movie not found' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// Delete a Movie
router.delete('/:id', (req, res) => {
    Recipe.findByIdAndDelete(req.params.id)
    .then((recipe) => {
      if (recipe) {
        res.json({ message: 'Movie deleted' });
      } else {
        res.status(404).json({ error: 'Movie not found' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

//Search by title
router.get('/search/:word', (req, res) => {
  const word = req.params.word;

  Recipe.find({ name: { $regex: word, $options: 'i' } })
    .then((recipes) => {
      if (recipes.length > 0) {
        res.json(recipes);
      } else {
        res.status(404).json({ error: 'No recipes found' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

//get from category
router.get('/cuisine/:word', (req, res) => {
    const word = req.params.word;
  
    Recipe.find({ cuisine: word })
      .then((recipes) => {
        if (recipes.length > 0) {
          res.json(recipes);
        } else {
          res.status(404).json({ error: 'No recipes found' });
        }
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

module.exports = router;