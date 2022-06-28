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
            res.status(400).send('username or password went wrong') 
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