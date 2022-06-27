const app = require('./app');
const http = require('http');
const server = http.createServer(app);

const { SERVER_PORT } = process.env;
const port = process.env.PORT || SERVER_PORT; 

server.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})