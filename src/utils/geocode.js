const request = require("request");

const geocode = (address, callback) => {
  url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiYWxpaGFzc2FuMDAiLCJhIjoiY2tkMDFsbnYzMHA5bjJycXJxeDZ5aXZvYyJ9.0MhOAWwJRjprb7_RuMnpvw&limit=1 ";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect location services", undefined);
    } else if (body.features.length === 0) {
      callback("unable to find location. Try another.", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
