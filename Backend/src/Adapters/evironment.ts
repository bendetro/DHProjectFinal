export {};

export const environment = process.env.NODE_ENV || 'development';

export const port = environment === 'production' ? process.env.PORT : 3200;

export const url =
  environment === 'production'
    ? 'https://whispering-castle-08366.herokuapp.com/'
    : `http://localhost:${port}`;
