'use strict';
const express = require('express');
const router = express.Router();
const mysql = require('../database/db');

// get all movies
router.get("/movies", async (req, res)=> {
  try {
        const movies =  await mysql.getMovies();
        // console.log(movies);
        res.json(movies);
  }catch(err){
    console.log(err);
    return res.sendStatus(500);
  }
})

router.get("/movies/:id", async(req, res) => {
    try {
          let movieId = req.params.id
          // console.log("movieId", movieId);
          const movie = await mysql.getMovieById(movieId);
          res.json(movie);
    }catch(err){
      console.log(err);
      return res.sendStatus(500);
    }
});

module.exports = router;