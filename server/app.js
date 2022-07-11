const express = require('express');
const cors = require('cors');

require('dotenv').config();
const bcrypt = require('bcryptjs');
const { escape } = require('mysql2')

const db = require('./config/database');
const jwt = require('jsonwebtoken')
const auth = require('./middleware/verify_token')
const app = express();
// const origin = process.env.NODE_ENV === 'development'? "http://localhost:3000": "http://192.168.43.201:3000";

app.use(cors({
    origin: ["http://192.168.43.201:3000", "http://localhost:3000"],
    credentials: true
})); 

app.use(express.json());

app.post('/api/non_auth/register_manager',  async (req, res)=>{
    try {
        const {username, password, name, surname, tel, email, type} = req.body;
        // console.log(username, password, name, surname, tel, email, type);
        console.log({username, password, name, surname, tel, email, type});
        if (!(username && password && name && surname && tel && email && type)){
            res.status(400).send('data required');
            return false;
        }

        const userData = await db.query(`SELECT * FROM manager WHERE manager_username = ${escape(username)}`);
        
        if (userData.length > 0){
            res.status(400).send('this username has been used');
            return false;
        } 

        const bcryptPassword = await bcrypt.hash(password, 10);
        const result = await db.query(`
            INSERT INTO manager(manager_name, manager_surname, manager_username, manager_password, manager_tel, manager_email) 
            VALUES(
                ${escape(name)}, 
                ${escape(surname)}, 
                ${escape(username)}, 
                ${escape(bcryptPassword)}, 
                ${escape(tel)}, 
                ${escape(email)}
                )
            `);
        if (result) {
            res.status(200).send('insert manager success');
        }else{
            res.sendStatus(400)
        }
        
    } catch (error) {
        console.log(error);
    }
})

app.post('/api/non_auth/login', async (req, res)=>{
    try {
        const {username, password, type} = req.body;

        if (!(username && password && type)) {
            res.status(400).send('data is requried')
            return false;
        }
        let user;
        switch (type) {
            case 'MANAGER':
                [user] = await db.query(`SELECT * FROM manager WHERE manager_username= ${escape(username)}`);
                break;
        
            case 'MAID':
                [user] = await db.query(`SELECT * FROM maid WHERE maid_username= ${escape(username)}`);
                break;
        
            case 'ENGINEER':
                [user] = await db.query(`SELECT * FROM engineer WHERE engineer_username= ${escape(username)}`);
                break;
        
            default:
                res.status(400).send('type not match');
                break;
        }

        if (user && (await bcrypt.compare(password, !!user['manager_password']?user['manager_password']:!!user['maid_password']?user['maid_password']:user['engineer_password']))) {
           
            const token = jwt.sign(
                { user_type: !!user['manager_id']?'MANAGER':!!user['maid_id']?'MAID':'ENGINEER',user_id: !!user['manager_id']?user['manager_id']:!!user['maid_id']?user['maid_id']:user['engineer_id']},
                process.env.TOKEN_KEY,
                { expiresIn: "6h" } // 1d = 1000*60*60*24
            )
            
            res.status(200).json(token) 

        }else{
            res.status(400).send('username or password went wrong') 
        }
    } catch (error) {
        console.log(error);
    }
})

app.use('/api', auth, require('./services/auth/route'))
app.use('/api/manager', auth, require('./services/other/manager/router'))
 
module.exports = app; 