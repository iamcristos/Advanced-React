// let's go!
require('dotenv').config({path: 'variables.env'});
const createServer = require('./createServer');
const db = require('./db');

const server = createServer();

server.start({
    cors: {
       credentials: true,
       origin: [process.env.FRONTEND_URL, process.env.BACKEND_URL, process.env.PLAYGROUND_URL]
    },
},
    deets => {
            console.log(`server is listening at http/localhost:${deets.port}`)
        }
)