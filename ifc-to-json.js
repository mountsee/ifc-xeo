import * as fs from 'fs';
import * as xeokit from 'xeokit-sdk';

const ifcFilePath = 'test.ifc';
const jsonFilePath = 'package.json';

const xeokitMetadata = require('xeokit-metadata');

xeokitMetadata.load("test.ifc").then((metadata) => {
  const json = metadata.toJSON();
  console.log(json);
});