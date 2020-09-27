export {};
import fileUpload from 'express-fileupload';
import {
  extractDataFromImage,
  ExtractionResult,
} from './Services/ImageDataExtractionService';
import express from 'express';
import bodyParser from 'body-parser';
import { getAllDataFromDB, updateDB } from './Adapters/dbAdapter';
import { port, url } from './Adapters/evironment';
const cors = require('cors');

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

app.use(cors());

app.use(fileUpload());

app.post('/', async (req: any, res: any) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }
  try {
    const data: ExtractionResult = await extractDataFromImage(req.files.image);
    if (!data) {
      res.send(500, 'Failed to detect text in image.');
    }
    res.status(200).send(data);
  } catch (err) {
    console.log(err);
    res.send(500, `${err}`);
  }
});

app.get('/', async (req, res) => {
  let data;
  try {
    data = await getAllDataFromDB();
    res.status(200).send(data);
  } catch (err) {
    console.log(err);
    res.status(500).send(`${err}`);
  }
});

app.put('/', async (req, res) => {
  console.log('req.body: ', JSON.stringify(req.body));
  try {
    console.log('updating content..');
    await updateDB(req.body);
  } catch (e) {
    console.log(e);
    //some connection error, need to solve
  } finally {
    res.status(200);
  }
});

app.listen(port, () => {
  console.log(`OCR Service listening at ${url}`);
});
