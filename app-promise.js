require('dotenv').config();
const yargs = require('yargs');
const axios = require('axios');

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
const geocodeURL = `http://www.mapquestapi.com/geocoding/v1/address?key=${process.env.MAPQUEST_API_KEY}&location=${encodedAddress}`;

axios(geocodeURL)
  .then((response) => {
    if (response.headers.transactionweight === 'NaN') {
      throw new Error('Unable to find address.');
    }

    const {
      latLng, street, adminArea4, adminArea3, adminArea1,
    } = response.data.results[0].locations[0];
    const weatherURL = `https://api.darksky.net/forecast/${process.env.DARK_SKY_API_KEY}/${latLng.lat},${latLng.lng}`;
    const address = `${(street) ? (`${street}, `) : ''}${(adminArea4) ? (`${adminArea4}, `) : ''}${(adminArea3) ? (`${adminArea3}, `) : ''}${(adminArea1) ? adminArea1 : ''}`;

    console.log(`Address: ${address}`);

    return axios(weatherURL);
  })
  .then((response) => {
    const {
      temperature, apparentTemperature, summary, windSpeed,
    } = response.data.currently;

    console.log(`Current temperature: ${temperature}°F`);
    console.log(`It feels like: ${apparentTemperature}°F`);
    console.log(`The weather is: ${summary.toLowerCase()}`);
    console.log(`The wind speed is: ${windSpeed} km/h`);
  })
  .catch((error) => {
    if (error.code === 'ENOTFOUND') {
      console.log('Unable to connect to API server.');
    } else {
      console.log(error.message);
    }
  });
