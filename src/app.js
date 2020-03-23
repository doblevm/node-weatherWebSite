// core modules
const path = require("path");
// npm modules
const hbs = require("hbs");
const express = require("express");
// local modules
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const PORT = process.env.PORT || 3000;

// define path for express configuration
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));

// Routes
app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "VELASQUEZ, Vladimir"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "VELASQUEZ, Vladimir"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "VELASQUEZ, Vladimir"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address"
    });
  }
  //
  const { address } = req.query;
  geocode(address, data => {
    forecast(data[1], data[0], data => {
      res.send({
        location: req.query.address,
        forecast: data
      });
    });
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "VELASQUEZ, Vladimir",
    errorMessage: "Page not found"
  });
});

app.listen(PORT, () => {
  console.log(`Server running at PORT: ${PORT}`);
});
