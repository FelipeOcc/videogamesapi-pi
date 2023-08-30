const axios = require("axios");
const { Router } = require("express");
const { Genre } = require("../db");
const { YOUR_API_KEY } = process.env;

const router = Router();

const getAllGenres = async (req, res) => {
  const genresApi = await axios.get(
    `https://api.rawg.io/api/genres?key=${YOUR_API_KEY}`
  );
  const nameGenres = genresApi.data.results;

  nameGenres.forEach(async (g) => {
    await Genre.findOrCreate({
      where: {
        name: g.name,
      },
    });
  });
  const allGenres = await Genre.findAll();
  res.status(200).json(allGenres);
};

router.get("/", getAllGenres);

router.post("/", (req, res, next) => {
  const { name } = req.body;
  return Genre.create({ name })
    .then((newGenreNew) => {
      res.status(201).send(newGenreNew); //201 mensaje creado con exito, es opcional
    })
    .catch((error) => next(error));
});

module.exports = router;
