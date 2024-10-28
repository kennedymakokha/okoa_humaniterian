import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
// const port = process.env.PORT || 5000
import connectDb from './config/db.config.js'
import path from 'path';
import cors from 'cors'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import Lab from './iolab.js'
import HTTP from 'http'

// routes
import course_routes from './routes/courses.route.js'
import speciality_routes from './routes/speciality.route.js'
import user_routes from './routes/users.route.js'
import dataEntry_routes from './routes/dataenty.route.js'
import practical_routes from './routes/practicals.route.js'
import finance_routes from './routes/finance.route.js'

import events from 'events'


import { fileURLToPath } from 'url';

// Get __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


events.EventEmitter.defaultMaxListeners = 15;
// const __filename = fileURLToPath(import.meta.url);
connectDb()
const app = express()
app.use(cors("*"))
app.use((req, res, next) => {
  // Set the Referrer-Policy header
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});
var http = HTTP.createServer(app);
app.use(express.json())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser())

// app.use('/api/courses', course_routes)
app.use('/api/speciality', speciality_routes)
app.use('/api/users', user_routes)
app.use('/api/data-entry', dataEntry_routes)
app.use('/api/practicals', practical_routes)
app.use('/api/finances', finance_routes)

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => res.send("Server started"))
// app.use(notFound);
// app.use(errorHandler);

// app.listen(port, () => console.log(`Server started on port ${port}`))
const port =
  process.env.NODE_ENV === "production" ? process.env.PORT || 5000 : 5000;
http.listen(port, () => console.log("Server listening on port " + port));

let io = Lab(http);
global.io = io;



// import rootpath from "rootpath";
// rootpath()
// import express from "express";
// const app = express();
// import cors from "cors";
// import morgan from "morgan";
// import bodyParser from "body-parser";
// import path from "path";
// import dotenv from "dotenv";
// // import course_route from "./routes/courses.route";
// app.use(morgan("tiny"));
// import Lab from "./iolab.js";
// // import {dbConfig} from "./config/db.config";
// import http from "http"
// // import { dbConfig } from "./config/db.config";
// http.createServer(app);
// app.use(express.static(path.join(__dirname, "public")));
// dotenv.config();
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(cors());


// // dbConfig()

// // api routes
// // app.use('/api/', course_route)
// // app.use('/api/', authRoute)
// // app.use('/api/', walletRoute)
// // app.use('/api/', msg)
// // app.use('/api/', mails)
// app.use('/public', express.static(path.join(__dirname, 'public')));

// app.use(express.static(path.join(__dirname, 'public')));
// const root = require('path').join(__dirname, '.', 'client/dist')
// app.use(express.static(root));

// app.get('*', function (req, res) {
//     res.sendFile('index.html', { root: path.join(__dirname, './client/dist') });
// });


// // start server
// const port =
//     process.env.NODE_ENV === "production" ? process.env.PORT || 4000 : 4000;
// http.listen(port, () => console.log("Server listening on port " + port));
// // const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80):80;
// // http.listen(port, () => console.log('Server listening on port ' + port));

// let io = Lab(http);
// global.io = io;
