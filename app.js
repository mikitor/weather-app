const yargs = require('yargs');

const geocode = require('./geocode/geocode');

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
    console.log(JSON.stringify(result, undefined, 2));
  }
});
