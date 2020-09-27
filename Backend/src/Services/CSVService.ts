const createCSVWriter = require('csv-writer').createObjectCsvWriter;
import { deleteCSVFile } from '../Adapters/fileSystem';

const csvWriter = createCSVWriter({
  path: './image.csv',
  header: [
    { id: 'content', title: 'Text' },
    { id: 'id', title: 'id' },
    { id: 'latitude', title: 'latitude' },
    { id: 'longitude', title: 'longitude' },
    { id: 'fullAddress', title: 'address' },
  ],
});

const csvWriterWithUpdatedContent = createCSVWriter({
  path: './imageWithUpdatedContent.csv',
  header: [
    { id: 'name', title: 'Contributer' },
    { id: 'email', title: 'Email' },
    { id: 'id', title: 'id' },
    { id: 'content', title: 'Text' },
  ],
});

export interface CSVRecord {
  content: string;
  id: number;
  latitude: string;
  longitude: string;
  fullAddress: string;
}

export const createCSV = async (records: CSVRecord[]) => {
  try {
    deleteCSVFile();
  } catch (err) {
    console.log(err);
  } finally {
    await csvWriter.writeRecords(records);
    console.log('Done writeRecords to image.csv');
  }
};

export const createCSVWithUpdatedContent = async (records: CSVRecord[]) => {
  try {
    deleteCSVFile();
  } catch (err) {
    console.log(err);
  } finally {
    await csvWriter.writeRecords(records);
    console.log('Done writeRecords to image.csv');
  }
};
