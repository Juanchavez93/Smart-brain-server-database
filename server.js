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
      host : '127.0.0.1',
      user : '',
      password : '',
      database : 'smart-brain'
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

    app.listen(3000, ()=> {
    console.log('app is running on port 3000');
})
