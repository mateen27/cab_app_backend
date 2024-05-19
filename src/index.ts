import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDatabase from './database/mongoDB/database';
import router from './routes/routes';

// env file configuration
dotenv.config();

// server
const app: Application = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// connect to the database
connectDatabase();

// routes of the application
// main routes of the application
app.use('/api/user', router);

// initializing the server
// port number
const PORT = process.env.PORT || 3001;

// server listening at 
app.listen(PORT, () => {
    console.log(`Server is running at 127.0.0.1:${PORT}`);
});