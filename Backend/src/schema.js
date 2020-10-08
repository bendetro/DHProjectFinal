import { Pool } from 'pg';
import { password, database, port, host } from './adapters/APIKeys/DBKeys';

// Declare a constant for the schema name
const schemaName = 'myschema';

// Declare a constant for the Postgres ROLE
const postgresRole = 'tdrqexxldsbhes';

// Declare global array for the Postgres schema names
var pgSchemas = [];

// Declare a new client instance from Pool()
const pool = new Pool({
  user: postgresRole,
  host,
  database,
  password,
  port,
});

const schemaCodes = {
  25007: 'schema_and_data_statement_mixing_not_supported',
  '3F000': 'invalid_schema_name',
  '42P06': 'duplicate_schema',
  '42P15': 'invalid_schema_definition',
  42000: 'syntax_error_or_access_rule_violation',
  42601: 'syntax_error',
};

async function schemaFuncs() {
  // Declare a string for the Pool's query
  let selectSchemasSql = 'SELECT myschema FROM information_schema.schemata;';
  await pool.query(selectSchemasSql, (err, res) => {
    // Log the SQL statement to console
    console.log('\nselectSchemasSql:', selectSchemasSql);

    // Check for Postgres exceptions
    if (err) {
      console.log('SELECT myschema:', schemaCodes[err.code]);
      console.log('ERROR code:', err.code);
    } else if (res.rows !== undefined) {
      // Iterate over the rows of Postgres schema names
      res.rows.forEach((row) => {
        // Push the schema's name to the array
        pgSchemas.push(row.schema_name);
      });

      // Log the number of Postgres schema names to console
      console.log('schema names:', pgSchemas);
      console.log('SELECT schema_name total schemas:', res.rowCount);
    }
  });

  // Create the SCHEMA with user auth if it doesn't exist
  let createSql = `CREATE SCHEMA IF NOT EXISTS ${schemaName} AUTHORIZATION ${postgresRole};`;

  // Log the SQL statement to console
  console.log('\ncreateSql:', createSql);
  await pool.query(createSql, (createErr, createRes) => {
    if (createErr) {
      console.log(
        'CREATE SCHEMA ERROR:',
        createErr.code,
        '--',
        schemaCodes[createErr.code]
      );
      console.log('ERROR code:', createErr.code);
      console.log('ERROR detail:', createErr.detail);
    }

    if (createRes) {
      console.log('\nCREATE SCHEMA RESULT:', createRes.command);

      let createTableSql = `CREATE TABLE ${schemaName}.test_table10(id SERIAL PRIMARY KEY,content TEXT, image TEXT, name TEXT, email TEXT, latitude TEXT, longitude TEXT, address TEXT);`;

      console.log('\ncreateTableSql:', createTableSql);

      pool.query(createTableSql, (tableErr, tableRes) => {
        if (tableErr) {
          console.log(
            'CREATE TABLE ERROR:',
            tableErr.code,
            '--',
            schemaCodes[tableErr.code]
          );
          console.log('createTableSql:', tableErr);
        }

        if (tableRes) {
          console.log('\nCREATE TABLE RESULT:', tableRes);
        }
      });
    }
  });
}

schemaFuncs();
