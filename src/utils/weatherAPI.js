const request = require("request");

const weatherAPI = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=c84ccb937a134b56732f261b84477c39&query=" +
    longitude +
    "," +
    latitude +
    "&units=m";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect weather services", undefined);
    } else if (body.error) {
      callback("unable to find location. Try another.", undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          " It's currently " +
          body.current.temperature +
          " degrees out. It feels like " +
          body.current.feelslike +
          " degrees out. Precipitation is " +
          body.current.precip
      );
    }
  });
};

module.exports = weatherAPI;
