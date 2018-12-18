require('dotenv').config();
const request = require('request');

request({
  url: `http://www.mapquestapi.com/geocoding/v1/address?key=${process.env.KEY}&location=1301%20lombard%20street%20philadelphia`,
  json: true,
}, (error, response, body) => {
  const {
    latLng, street, adminArea4, adminArea3, adminArea1,
  } = body.results[0].locations[0];
  console.log(`Address: ${street}, ${adminArea4}, ${adminArea3}, ${adminArea1}`);
  console.log(`Latitude: ${latLng.lat}`);
  console.log(`Longitude: ${latLng.lng}`);
});
