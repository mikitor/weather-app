require('dotenv').config();
const request = require('request');
const yargs = require('yargs');

const { argv } = yargs
  .options({
    address: {
      description: 'Get the weather at this address',
      demand: true,
      alias: 'a',
      string: true,
    },
  })
  .help()
  .alias('help', 'h');
const encodedAddress = encodeURIComponent(argv.address);

request({
  url: `http://www.mapquestapi.com/geocoding/v1/address?key=${process.env.KEY}&location=${encodedAddress}`,
  json: true,
}, (error, response, body) => {
  if (error) {
    console.log('Unable to connect to MapQuest servers.');
  } else if (body.results[0].locations[0].geocodeQuality === 'ADDRESS' || body.results[0].locations[0].geocodeQuality === 'STREET' || body.results[0].locations[0].geocodeQuality === 'ZIP') {
    const {
      latLng, street, adminArea4, adminArea3, adminArea1,
    } = body.results[0].locations[0];
    console.log(`Address: ${(street) ? (`${street}, `) : ''}${(adminArea4) ? (`${adminArea4}, `) : ''}${(adminArea3) ? (`${adminArea3}, `) : ''}${(adminArea1) || ''}`);
    console.log(`Latitude: ${latLng.lat}`);
    console.log(`Longitude: ${latLng.lng}`);
  } else {
    console.log('Unable to find that address. Please provide a more precise address.');
    console.log(body.results[0].locations[0].geocodeQuality);
  }
});
