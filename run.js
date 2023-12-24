require('ts-node').register();

const transformer = require('./transformer/index');

transformer.transform();
