const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const server = express();

const knexConfig = {
  client: 'sqlite3',
  connection: {
    filename: './data/lambda.db3'
  },
  useNullAsDefault: true,
}

server.use(express.json());
server.use(helmet());

const port = 5000;
server.listen(port, () => {
  console.log(`Listening on port ${port}...`)
})
