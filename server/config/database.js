require('dotenv').config();
const mysql = require('mysql2/promise')

class Database{

    static async query(sql){
        const connect = await mysql.createConnection({
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            host: process.env.DB_HOST,
            database: process.env.DB_DATABASE,
            port: process.env.DB_PORT,
        })

        const [row, col] = await connect.execute(sql);
        connect.end();
        return row
    }
}

module.exports = Database;
