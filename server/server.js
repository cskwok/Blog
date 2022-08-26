import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import globalRouter from './routes/index.js';

dotenv.config();

const port = process.env.SERVER_PORT || 5000;

const corsOptions = {
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
    credentials: true,
    optionsSuccessStatus: 200
}

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());

app.use("/api", cors(corsOptions), globalRouter);

app.listen(port, () => {
    console.log(`Server started at port ${port}.`);
    console.log('test');
    console.log('test2');
});