require('dotenv').config();
const request = require('request');
const yargs = require('yargs');

const argv = yargs
  .options({
    address: {
      description: 'Get the weather at this address',
      demand: true,
      alias: 'a',
      string: true,
    }
  })
  .help()
  .alias('help', 'h')
  .argv;
const encodedAddress = encodeURIComponent(argv.address);

request({
  url: `http://www.mapquestapi.com/geocoding/v1/address?key=${process.env.KEY}&location=${encodedAddress}`,
  json: true,
}, (error, response, body) => {
  const {
    latLng, street, adminArea4, adminArea3, adminArea1,
  } = body.results[0].locations[0];
  console.log(`Address: ${street}, ${adminArea4}, ${adminArea3}, ${adminArea1}`);
  console.log(`Latitude: ${latLng.lat}`);
  console.log(`Longitude: ${latLng.lng}`);
});
