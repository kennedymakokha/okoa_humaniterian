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
import speciality_routes from './routes/speciality.route.js'
import user_routes from './routes/users.route.js'
import finance_routes from './routes/finance.route.js'
import patients_routes from './routes/patients.route.js'
import triage_routes from './routes/triage.route.js'
import tests_routes from './routes/tests.route.js'
import drug_routes from './routes/drugs.route.js'
import lab_tests_routes from './routes/labtests.route.js'
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
app.use('/api/tests', tests_routes)
app.use('/api/lab-tests', lab_tests_routes)
app.use('/api/triage', triage_routes)
app.use('/api/speciality', speciality_routes)
app.use('/api/users', user_routes)
app.use('/api/drugs', drug_routes)
app.use('/api/finances', finance_routes)
app.use('/api/patients', patients_routes)


app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => res.send("Server started"))
// app.use(notFound);
// app.use(errorHandler);


const port =
  process.env.NODE_ENV === "production" ? process.env.PORT || 5000 : 5000;
http.listen(port, () => console.log("Server listening on port " + port));

let io = Lab(http);
global.io = io;

