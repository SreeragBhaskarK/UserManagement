import pkg from 'pg'
import { config } from 'dotenv'
config()
const { Pool } = pkg
const { DB_HOST, DB_USER, DB_PORT, DB_PASSWORD, DB_DATABASE } = process.env
const pool = new Pool({
    user: DB_USER,
    host: DB_HOST,
    database: DB_DATABASE,
    password:  DB_PASSWORD,
    port: DB_PORT,
})

pool.connect((err, client, done) => {
    if (err) {
        console.error('Error connecting to database', err);
    } else {
        console.log('connect to database 🚀🚀🚀');
        done()
    }
    
})

export default pool;