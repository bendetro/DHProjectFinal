export {};
import express from 'express';
import { intialiazeDBClient } from './adapters/dbAdapter';
import { config } from './adapters/evironment';
import setLoaders from './loaders/express';
import setRoutes from './routes/ocr-routs';

const startServer = async () => {
  const { port, baseUrl } = config;
  const app = express();

  await intialiazeDBClient();

  setLoaders({ app });
  setRoutes({ app });

  app.listen(port, () => {
    console.log(`OCR Service listening at ${baseUrl}`);
  });
};

startServer();
