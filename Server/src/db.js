require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/videogames`,
  {
    logging: false,
    native: false,
  }
);
const basename = path.basename(__filename);

const modelDefiners = [];

// Agregamos al arreglo modelDefiners.
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Sequelize a todos los modelos.
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
const { Videogame, Genre, Platform } = sequelize.models;

// Relaciones
Videogame.belongsToMany(Genre, {
  through: "genre_videogame",
});

Genre.belongsToMany(Videogame, {
  through: "genre_videogame",
});

Videogame.belongsToMany(Platform, {
  through: "platform_videogame",
});

Platform.belongsToMany(Videogame, {
  through: "platform_videogame",
});

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
