const axios = require("axios");

const forecast = (lat, lon, callback) => {
  const darkSky_ID = "982b1ea09c1b27b85813742b1474658b";
  const url = `https://api.darksky.net/forecast/${darkSky_ID}/${lat},${lon}`;
  //https://api.darksky.net/forecast/982b1ea09c1b27b85813742b1474658b/-75.7088,44.1545
  axios
    .get(url)
    .then(res => {
      callback(res.data.currently.temperature);
    })
    .catch(error => {
      callback("Unable to fetch the server");
    });
};

module.exports = forecast;
