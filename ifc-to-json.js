import * as fs from 'fs';
import * as xeokit from 'xeokit-sdk';

const ifcFilePath = 'test.ifc';
const jsonFilePath = 'package.json';

const model = new xeokit.Model();

xeokit.IfcLoader.load(ifcFilePath, model, () => {
  const json = model.toJSON();
  
  // Write the JSON to a file
  fs.writeFileSync(jsonFilePath, JSON.stringify(json, null, 2));
  
  console.log(`JSON saved to ${jsonFilePath}`);
});
