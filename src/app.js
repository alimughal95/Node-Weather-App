const path = require("path");
const express = require("express");
const hbs = require("hbs");
const { registerHelper } = require("hbs");
const geocode = require("./utils/geocode");
const weatherAPI = require("./utils/weatherAPI");

const app = express();

const port = process.env.PORT || 3000;

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

//setup handlebars engines ans views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.get("", (req, res) => {
  res.render("index", {
    title: "WeatherApp",
    name: "Ali Hassan",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Ali Hassan",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    description: "Page under construction!",
    name: "Ali Hassan",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide address",
    });
  } else {
    geocode(
      req.query.address,
      (error, { longitude, latitude, location } = {}) => {
        if (error) {
          return res.send({
            error: "Unable to find location, Try another search",
          });
        }
        weatherAPI(longitude, latitude, (error, forecastData) => {
          if (error) {
            return res.send({
              error: "Unable to fetch data",
            });
          }
          res.send({
            WeatherForecast: forecastData,
            location,
            address: req.query.address,
          });
        });
      }
    );
  }
  // res.send({
  //   forecast: "It's raining",
  //   location: "Lahore",
  //   address: req.query.address,
  // });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "you must provide a search area",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "404 Page",
    name: "Ali Hassan",
    error: "Help Article not found",
  });
});

// app.get("/data", (req, res) => {
//   res.render("data", {
//     description: "This is data page",
//   });
// });

// app.get("/error/*", (req, res) => {
//   res.render("error");
// });

app.get("*", (req, res) => {
  res.render("error", {
    title: "Error page",
    name: "Ali Hassan",
    error: "Page not found",
  });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
