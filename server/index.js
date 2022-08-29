const app = require('./app');
const http = require('http');
const fs = require('fs');
// const https = require('https')

// const privateKey  = fs.readFileSync('sslcert/server.key', 'utf8');
// const certificate = fs.readFileSync('sslcert/server.crt', 'utf8');

// const credentials = {key: privateKey, cert: certificate};

const httpServer = http.createServer(app);
// const httpsServer = https.createServer(credentials, app);

const { SERVER_PORT } = process.env;
const portHttp = process.env.HTTP_PORT || SERVER_PORT; 
// const portHttps = process.env.HTTPS_PORT || SERVER_PORT; 

httpServer.listen(portHttp, ()=>{
    console.log(`Server is running on http_port ${portHttp}`);
})

// httpsServer.listen(portHttps, ()=>{
//     console.log(`Server is runing on https_port ${portHttps}`);
// })