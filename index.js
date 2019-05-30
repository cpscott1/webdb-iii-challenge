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

server.get('/api/cohorts/:id', (req, res) => {
  db('cohorts')
  .where({ id: req.params.id })
  .first()
  .then(cohort => {
    if(cohort) {
    res.status(200).json(cohort);
    } else {
      res.status(404).json({ message: 'cohort not found' })
    }
  })
  .catch(err => {
    res.status(500).json(err);
  })
})

server.get('/api/cohorts/:id/students', (req, res) => {
  db('students')
    .where({ cohort_id: req.params.id })
    .then(student => {
      res.status(200).json(student);
    })
    .catch(err => {
      res.status(500).json(err);
    })
})

server.post('/api/cohorts', (req, res) => {
  if(!req.body.name) {
    res.status(400).json({ message: 'need a name' })
  } else {
    db('cohorts')
    .insert(req.body, 'id')
    .then(ids => {
      db('cohorts')
        .where({ id: ids[0] })
        .first()
        .then(role => {
            res.status(200).json(cohort);
        })
        .catch(err => {
          res.status(500).json(err);
        })
    })
    .catch(err => {
      res.status(500).json(err);
    })
  }
})

server.put('/api/cohorts/:id', (req, res) => {
  db('cohorts')
  .where({ id: req.params.id })
  .update(req.body)
  .then(count => {
    if(count > 0) {
      res.status(200).json({ message: 'updated cohort' })
    } else {
      res.status(404).json({ message: 'cohort does not exist' })
    }
  })
  .catch(err => {
    res.status(500).json(err);
  })
})

server.delete('/api/cohorts/:id', (req, res) => {
  db('cohorts')
  .where({ id: req.params.id })
  .delete(req.body)
  .then(count => {
    if(count > 0) {
      res.status(200).json({ message: 'cohort gone' })
    } else {
      res.status(404).json({ message: 'cohort does not exist' })
    }
  })
  .catch(err => {
     res.status(500).json(err);
  })
})


const port = 5000;
server.listen(port, () => {
  console.log(`Listening on port ${port}...`)
})
