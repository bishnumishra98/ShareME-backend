const express = require('express');
const app = express();
const connectDB = require('./config/db');
connectDB();
const path = require('path');   // path is an in-built node.js module
const cors = require('cors');   // a middleware to allow browser to request different domain server
require('dotenv').config();   // Load environment variables


// Middlewares
app.use(express.static('public'));   // app.use() is a  built-in method used to mount middleware functions.
// express.static() is a built-in middleware function in Express.js to serve static files such as HTML,
// images, CSS, JavaScript, etc., from a specified directory.
app.use(express.json());   // express.json() is a middleware used to parse json data in express application

// CORS
// const corsOptions = {
//     origin: process.env.ALLOWED_CLIENTS.split(',')
// }
// app.use(cors(corsOptions));

// Middleware to handle CORS
app.use(cors({
    origin: process.env.ALLOWED_CLIENTS.split(',').map(url => url.trim()),
}));


// Template engine (ejs)
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

// Routes
app.use('/api/files', require('./routes/files'));
app.use('/files', require('./routes/show'));
app.use('/files/download', require('./routes/download'));


const PORT = process.env.PORT || 3000;   // if there's a port number specified 
// in the environment variables, use that. If not specified, use port 3000.

app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
});
