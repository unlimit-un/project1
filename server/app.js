const express = require('express');
const cors = require('cors');
const express_session = require('express-session');
const cookie_parser = require('cookie-parser');
require('dotenv').config();
const bcrypt = require('bcryptjs');
const { escape } = require('mysql2')

const db = require('./config/database');

const auth_session = require('./middleware/auth_session')

const app = express();
const origin = process.env.NODE_ENV === 'development'? "http://localhost:3000": "http://192.168.43.201:3000";

app.use(cors({
    origin,
    credentials: true
})); 
app.use(express.urlencoded({ extended: true  }))
app.use(express.json());
app.use(cookie_parser());
app.use(express_session({
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60, secure: false},
    secret: process.env.SESSION_SECRET
}));

let session;

const check_session_login = (req, res, next) =>{
    if (session === undefined) {
        res.status(401)
    }else{
        req.auth_session = session
        // console.log(req.mw_session);
    }
    next()
}

app.get('/api/login', check_session_login, (req, res)=>{  
    console.log(req.auth_session);
    if(req.auth_session){
        res.send(req.auth_session.user_data)
    }else{
        res.send('no data')
    }
})

app.post('/register',  async (req, res)=>{
    try {
        const {username, password, name, surname, tel, email, type} = req.body;
        // console.log(username, password, name, surname, tel, email, type);

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

app.post('/api/login', check_session_login, async (req, res)=>{
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
        // console.log(user);
        if (user && (await bcrypt.compare(password, !!user['manager_password']?user['manager_password']:!!user['maid_password']?user['maid_password']:user['engineer_password']))) {
            // console.log(req.session);
            if (req.auth_session !== session) {
                req.auth_session = session
            }
            if (session === undefined && req.auth_session === undefined) { 
                
                session = req.session;
                session.user_data = !!user['manager_id']?{user_id: user['manager_id'], type: 'manager'}:
                                !!user['maid_id']?{user_id: user['maid_id'], type: 'maid'}:
                                {user_id: user['engineer_id'], type: 'engineer'};
                // console.log(`req.session.userid: ${session.userid}`)
                // console.log(session);  
                res.status(200).json(session.user_data) 
                updataSessionFnc();
            }else{

                res.status(400).send('you are logined')
            }

        }else{
            res.send('username or password went wrong') 
        }
    } catch (error) {
        console.log(error);
    }
})

app.post('/api/logout', check_session_login, (req, res)=>{ 
    if (!(req.auth_session === undefined || req.auth_session.user_data === undefined)) {
        req.auth_session = undefined;
        session = undefined;
        res.status(200).send('sign out.')
    }else{
        res.status(401).send('please login')
    }
})
 
const updataSessionFnc = () =>{
    if (session !== undefined) {
        app.use('/api', auth_session(session), require('./services/auth/route'))
    }
}


module.exports = app; 