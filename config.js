import fs from 'fs';

var config = {}
var path = `./${process.env.NODE_ENV || 'development'}.json`
try {
  fs.accessSync(path, fs.F_OK);
  console.log(`Load configurations from ${path}`)
  config = require(path);
} catch (error) {
  console.log(error)
}

// load environment variables
config = Object.assign(config, process.env);

export default config;
