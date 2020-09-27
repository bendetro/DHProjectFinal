export {};
import { Pool } from 'pg';
import { base64_encode } from '../Adapters/fileSystem';
import { environment } from './evironment';
const { promisify } = require('util');
const exec = promisify(require('child_process').exec);

let pool: any;

async function getLocalDATABASE_URL() {
  const res =
    environment === 'production'
      ? null
      : await exec('heroku config:get DATABASE_URL -a whispering-castle-08366');
  return res ? res.stdout : null;
}

const intialiazeClient = async function () {
  const localDATABASE_URL = await getLocalDATABASE_URL();
  const DATABASE_URL =
    environment === 'production' ? process.env.DATABASE_URL : localDATABASE_URL;
  pool = new Pool({
    connectionString: DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
};

intialiazeClient();

export const insertIntoDB = async (
  path: string,
  content: string,
  latitude: string,
  longitude: string,
  fullAddress: string
) => {
  const base64Image = base64_encode(path);
  const query =
    'INSERT INTO myschema.test_table10(content,image,latitude,longitude,address)VALUES($1,$2,$3,$4,$5) RETURNING id';
  const result = await pool.query(query, [
    content,
    base64Image,
    latitude,
    longitude,
    fullAddress,
  ]);
  return result && result.rows && result.rows[0] ? result.rows[0].id : null;
};

export const getAllDataFromDB = async function getAllDataFromDB() {
  const data = await pool.query(`SELECT * FROM myschema.test_table10`);
  return data ? data.rows : null;
};

export const updateDB = async ({
  id,
  name,
  email,
  content,
}: {
  id: string;
  name: string;
  email: string;
  content: string;
}) => {
  const query =
    'UPDATE myschema.test_table10 SET content=($1), name=($2), email=($3) WHERE id=($4)';
  return await pool.query(query, [content, name, email, id]);
};
