require('dotenv').config();
const request = require('request');

const geocodeAddress = (address, callback) => {
  const encodedAddress = encodeURIComponent(address);

  request({
    url: `http://www.mapquestapi.com/geocoding/v1/address?key=${process.env.MAPQUEST_API_KEY}&location=${encodedAddress}`,
    json: true,
  }, (error, response, body) => {
    if (error) {
      callback('Unable to connect to MapQuest servers.');
    } else if (body.info.statuscode === 400) {
      callback('Unable to find that address.');
    } else if (body.info.statuscode === 0) {
      const {
        latLng, street, adminArea4, adminArea3, adminArea1,
      } = body.results[0].locations[0];
      const result = {
        address: `${(street) ? (`${street}, `) : ''}${(adminArea4) ? (`${adminArea4}, `) : ''}${(adminArea3) ? (`${adminArea3}, `) : ''}${(adminArea1) ? adminArea1 : ''}`,
        latitude: latLng.lat,
        longitude: latLng.lng,
      };
      callback(undefined, result);
    }
  });
};

module.exports = {
  geocodeAddress,
};
