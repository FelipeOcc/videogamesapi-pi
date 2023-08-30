const { Router } = require("express");
const genreRoute = require("./genero");
const videogameRoute = require("./videojuego");
const platformRoute = require("./plataformas");

const router = Router();

router.use("/genre", genreRoute); //middelware quiere decir que en la ruta /gender use genderRoute
router.use("/videogame", videogameRoute);
router.use("/platforms", platformRoute);

module.exports = router;
