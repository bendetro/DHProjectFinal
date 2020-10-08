import { getAllDataFromDB, updateDB } from '../adapters/dbAdapter';
import {
  extractDataFromImage,
  ExtractionResult,
} from '../services/ImageDataExtractionService';

export const uploadImage = async ({ req, res }: any) => {
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
};

export const getData = async ({ res }: any) => {
  let data;
  try {
    data = await getAllDataFromDB();
    res.status(200).send(data);
  } catch (err) {
    console.log(err);
    res.status(500).send(`${err}`);
  }
};

export const updateImageData = async ({ req, res }: any) => {
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
};
