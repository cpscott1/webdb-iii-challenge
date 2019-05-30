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

const db = knex(knexConfig);

server.use(express.json());
server.use(helmet());


server.get('/api/cohorts', (req, res) => {
  db('cohorts')
  .then(cohorts => {
    res.status(200).json(cohorts);
  })
  .catch(err => {
    console.log(err);
  })
})

const port = 5000;
server.listen(port, () => {
  console.log(`Listening on port ${port}...`)
})
