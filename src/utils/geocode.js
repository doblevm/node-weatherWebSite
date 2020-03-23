const axios = require("axios");

const geocode = (address, callback) => {
  const mapboxToken =
    "pk.eyJ1IjoiZG9ibGV2bSIsImEiOiJjazd6N3FqcWEwMmpvM2ZvcTVlZWM2bjM3In0.NXkpuzIHBcQTdAF2GlAeVQ";
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=${mapboxToken}&limit=1`;
  // https://api.mapbox.com/geocoding/v5/mapbox.places/boston.json?access_token=pk.eyJ1IjoiZG9ibGV2bSIsImEiOiJjazd6N3FqcWEwMmpvM2ZvcTVlZWM2bjM3In0.NXkpuzIHBcQTdAF2GlAeVQ&limit=1
  axios
    .get(url)
    .then(res => {
      if (res.data.features.length === 0) {
        callback("Unable to find the location");
      } else {
        callback(res.data.features[0].center);
      }
    })
    .catch(err => {
      callback("Unable to connect to server");
    });
};

module.exports = geocode;
