import path from 'path';
import postmanToOpenApi from 'postman-to-openapi';

// __dirname is not defined in ES module scope
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const postmanCollection = path.join(__dirname, './anyware_coligo_db.postman_collection.json');
const outputFile = path.join(__dirname, './swagger.yaml');

(async function () {
  try {
    await postmanToOpenApi(postmanCollection, outputFile, { defaultTag: 'General' });
    console.log('done converting postman to yaml');
  } catch (err) {
    console.log('error converting postman to yaml', err);
  }
})();
