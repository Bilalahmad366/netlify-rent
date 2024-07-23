const express = require('express');
const serverless = require('serverless-http');
const app = express();
const router = express.Router();
const db = require('../db');
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Allow requests from http://localhost:5173
const allowedOrigins = ['http://localhost:5173','http://https://rococo-basbousa-faf12a.netlify.app'];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(cors(corsOptions));




router.get('/', (req, res) => {
  res.send('App is running..');
});

router.get('/rent', (req, res) => {
  res.send('rent is good ..');
});



const rent = require('../routes/rent')
app.use('/RentDetail',rent)

const property=require('../routes/property')
app.use('/property',property)

app.use('/.netlify/functions/api/', router);
module.exports.handler = serverless(app);

const port = 3000;
app.listen(port, () => {
  console.log("server is running ... ", port)
})