import * as express from 'express';
import * as bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
const cors = require('cors');

export default function setLoaders({ app }: { app: express.Application }) {
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  app.use(bodyParser.json());
  app.use(cors());
  app.use(fileUpload());
  return app;
}
