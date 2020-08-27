const request = require('request');

const { URL } = require('./constants');


const fetchBreedDescription = function(breedName, callback) {

  let propertiesObject = { q: breedName };

  request({ url: URL, qs: propertiesObject }, (error, response, body) => {
    if (error !== undefined && error !== null) {
      callback(error, null);
    }

    if (response && response.statusCode && response.statusCode !== 200) {
      callback(response, null);
    }
    let data = JSON.parse(body);

    if (data.length === 0) {
      callback('Not found', null);
    } else {
      callback(null, data[0].description);
    }

  });
};

module.exports = { fetchBreedDescription };