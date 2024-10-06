const express = require('express');
const path = require('path');
const axios = require('axios');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit'); // Add rate limiting
const nodemailer = require('nodemailer');

const serviceUrl = 'https://m2m.cr.usgs.gov/api/api/json/stable/';

const transporter = nodemailer.createTransport({
  port: 1717,
  host: 'smtp.gmail.com',
  auth: {
    type: 'OAuth2',
    user: 'wal.temite@gmail.com',
    pass: process.env.GMAIL_PASS,
    clientId: process.env.GMAIL_CLIENT_ID,
    clientSecret: process.env.GMAIL_CLIENT_SECRET,
  },
  secure: true,
});


let apiKey = null;

const pendingNotifications = {

};

const init = async () => {
  const app = express();
  dotenv.config();

  await m2mlogin();
  middleware(app);
  rateLimiting(app); // Add rate limiting middleware
  endpoints(app);

  app.listen(process.env.PORT, process.env.HOST, () => {
    console.log(`Listening at http://${process.env.HOST}:${process.env.PORT}`);
  });
};

const m2mlogin = async () => {
  const loginUrl = serviceUrl + 'login-token';
  let payload = {
    username: process.env.M2M_USERNAME,
    token: process.env.M2M_APP_TOKEN
  };
  try {
    const response = await axios.post(loginUrl, payload, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    apiKey = response.data.data;
    console.log('Authenticated correctly with M2M');
  } catch (err) {
    console.error("Error occurred during login-token request:", err.message);
  }
};

const middleware = (app) => {
  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, 'views'));
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.json());
  app.use(express.urlencoded({extended: false}));
};

// Rate limiting function
const rateLimiting = (app) => {
  const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 15 minutes window
    max: 100, // limit each IP to 100 requests per window
    message: 'Too many requests from this IP, please try again later.',
  });

  app.use('/api/', limiter); // Apply rate limiter to all routes starting with /api/
};

const endpoints = (app) => {
  app.post('/api/setup-notification', (req,res) => {
    const { email, leadTimeHours } = req.body;
    const time = new Date();
    const mailData = {
      from: 'wal.temite@gmail.com',  // sender address
      to: 'jposorniot@gmail.com',   // list of receivers
      subject: 'Sending Email using Node.js',
      text: 'That was easy!',
      html: `<b>Hey there! </b>
         <br> This is our first message sent with Nodemailer<br/>`,
    };
    transporter.sendMail(mailData, (error, info) => {
      if (error)
        return console.error(error);
      res.status(200).json({ message: "mail send", message_id: info.message_id });
    })

  });
  app.post('/api/scene-search', async (req, res) => {
    console.log('request requested');
    const ssUrl = serviceUrl + 'scene-search';
    const params = {
      'datasetName': 'landsat_ot_c2_l2',
      'sceneFilter': {
        "spatialFilter": {
          "filterType": "mbr",
          "lowerLeft": {
            "latitude": req.body.coordinate[0],
            "longitude": req.body.coordinate[1]
          },
          "upperRight": {
            "latitude": req.body.coordinate[0],
            "longitude": req.body.coordinate[1]
          }
        },
        "cloudCoverFilter": {
          "max": req.body.cloudCoverageFilter,
          "min": 0,
          "includeUnknown": true
        },
        "acquisitionFilter": {
          "start": req.body.filterDateStart,
          "end": req.body.filterDateEnd,
        }
      },
      'metadataType': 'summary',
      'maxResults': 1,
    };
    const response = await axios.post(ssUrl, params, {
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': apiKey,
      }
    });
    let nextPassDate = calculateNextPassDate(response.data.data.results[0].publishDate);
    const data = {
      ...response.data,
      nextPassDate
    }
    res.json(data);
  });
};

init();

const calculateNextPassDate = (lastDatetime) => {
  const daysInterval = 16; // Intervalo en días entre pasos del satélite

  // Convertir la fecha y hora de string a un objeto Date
  const lastDatetimeObj = new Date(lastDatetime);

  if (isNaN(lastDatetimeObj.getTime())) {
      throw new Error('Invalid date format');
  }

  // Obtener la fecha y hora actual
  const currentDate = new Date();

  // Inicializar la fecha de próxima pasada con la última fecha proporcionada
  let nextPassDate = new Date(lastDatetimeObj);

  // Sumar días hasta que la próxima pasada sea mayor que la fecha actual
  while (nextPassDate <= currentDate) {
      nextPassDate.setDate(nextPassDate.getDate() + daysInterval);
  }

  // Formatear la fecha de vuelta en el formato 'YYYY-MM-DD HH:MM:SS' sin UTC
  const year = nextPassDate.getFullYear();
  const month = String(nextPassDate.getMonth() + 1).padStart(2, '0'); // Meses empiezan desde 0
  const day = String(nextPassDate.getDate()).padStart(2, '0');
  const hours = String(nextPassDate.getHours()).padStart(2, '0');
  const minutes = String(nextPassDate.getMinutes()).padStart(2, '0');
  const seconds = String(nextPassDate.getSeconds()).padStart(2, '0');

  // Formato final: 'YYYY-MM-DD HH:MM:SS'
  const nextPassFormatted = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  
  return nextPassFormatted;
}
