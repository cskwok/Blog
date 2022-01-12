import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import globalRouter from './routes/index.js';

dotenv.config();

const port = process.env.SERVER_PORT || 5000;

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api", globalRouter);

app.listen(port, ()=>{
    console.log(`Server started at port ${port}.`);
});