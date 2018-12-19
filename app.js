const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

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

geocode.geocodeAddress(argv.address, (errorMessage, result) => {
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    console.log(result.address);
    weather.currentTemperature(result.latitude, result.longitude, (errorMessage, weatherResult) => {
      if (errorMessage) {
        console.log(errorMessage);
      } else {
        console.log(`It's currently ${weatherResult.temperature}. It feels like ${weatherResult.apparentTemperature}`);
      }
    });
  }
});
