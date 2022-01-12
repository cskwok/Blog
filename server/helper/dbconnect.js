import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const sqlOptions = {
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DB,
    waitForConnections: process.env.SQL_WAIT_FOR_CONNECTIONS,
    connectionLimit: process.env.SQL_CONNECTION_LIMIT,
    queueLimit: process.env.SQL_QUEUE_LIMIT    
}

export default await mysql.createPool(sqlOptions);