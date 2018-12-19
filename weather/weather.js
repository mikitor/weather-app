require('dotenv').config();
const request = require('request');

const currentTemperature = (latitude, longitude, callback) => {
  request({
    url: `https://api.darksky.net/forecast/${process.env.DARK_SKY_API_KEY}/${latitude},${longitude}`,
    json: true,
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      callback(undefined, {
        temperature: `${body.currently.temperature}°F`,
        apparentTemperature: `${body.currently.apparentTemperature}°F`,
      });
    } else {
      callback('Unable to fetch weather.');
    }
  });
};

module.exports = {
  currentTemperature,
};
