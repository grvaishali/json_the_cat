const request = require('request');
const fs = require('fs');


const url = process.argv[2];
const path = process.argv[3];
const breedName = process.argv[4];

if (url === undefined || path === undefined || breedName === undefined) {
  console.log('Request URL, path and breed Name are required');
  process.exit();
}

let propertiesObject = { q: breedName };

request({ url: url, qs: propertiesObject }, (error, response, body) => {
  if (error !== undefined && error !== null) {
    console.log(error);
  }

  if (response && response.statusCode && response.statusCode !== 200) {
    console.log(response);
  }
  fs.writeFile(path, body, function(err) {
    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!");
    let data = JSON.parse(body);

    if (data.length === 0) {
      console.log('Not found');
    } else {
      console.log(data[0].description);
    }
  });

});