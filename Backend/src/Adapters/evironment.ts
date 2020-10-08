export {};
const { promisify } = require('util');
const exec = promisify(require('child_process').exec);

const PRODUCTION = 'production';
const DEVELOPMENT = 'development';

const isProduction = (environment: string) => environment === PRODUCTION;

const environment = process.env.NODE_ENV || DEVELOPMENT;

const port = isProduction(environment) ? process.env.PORT : 3200;

const baseUrl = isProduction(environment)
  ? 'https://whispering-castle-08366.herokuapp.com/'
  : `http://localhost:${port}`;

async function getDBUrl() {
  return isProduction(environment)
    ? process.env.DATABASE_URL
    : exec('heroku config:get DATABASE_URL -a whispering-castle-08366');
}

export const config = {
  environment,
  port,
  baseUrl,
  getDBUrl,
};
