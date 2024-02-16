const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const postgres = knex({

  client: 'pg',
  connection: {
    connectionString : process.env.DATABASE_URL,
  }
});

const app = express();


app.use(cors())
app.use(express.json());

app.get('/', (req, res)=> { res.send(postgres.users) })
app.post('/signin', signin.handleSignin(postgres, bcrypt))
app.post('/register', (req, res) => { register.handleRegister(req, res, postgres, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, postgres)})
app.put('/image', (req, res) => { image.handleImage(req, res, postgres)})
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})

const DATABASE_URL = process.env.DATABASE_URL
app.listen(5432, () => {
  console.log(`server is listening to port ${DATABASE_URL}`)
});
