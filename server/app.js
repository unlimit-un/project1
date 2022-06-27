const express = require('express');
const cors = require('cors');
const express_session = require('express-session');
const cookie_parser = require('cookie-parser');
require('dotenv').config();

const app = express();

app.use(cors()); 
app.use(express.json());
app.use(cookie_parser());
app.use(express_session({
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 },
    secret: process.env.SESSION_SECRET
}));

app.get('/',(req, res)=>{
    res.status(200).send('im express')
})

let session;
require('./services/auth/route').construc(session)
app.use('/api', require('./services/auth/route').router) 

module.exports = app; 