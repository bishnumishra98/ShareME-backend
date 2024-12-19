const express = require('express');
const app = express();
const connectDB = require('./config/db');
connectDB();
const path = require('path');   // path is an in-built node.js module
const cors = require('cors');   // a middleware to allow browser to request different domain server
require('dotenv').config();   // Load environment variables
const File = require("./models/file");

// Middlewares
app.use(express.static('public'));   // app.use() is a  built-in method used to mount middleware functions.
// express.static() is a built-in middleware function in Express.js to serve static files such as HTML,
// images, CSS, JavaScript, etc., from a specified directory.
app.use(express.json());   // express.json() is a middleware used to parse json data in express application

// Middleware to handle CORS
app.use(cors({
    origin: '*'
}));

// Template engine (ejs)
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

// Routes
app.use('/api/files', require('./routes/files'));
app.use('/files', require('./routes/show'));
app.use('/files/download', require('./routes/download'));

// Function to delete all files older than 24 hours
async function deleteFiles() {
    const past24hrDate = new Date(Date.now() - 24 * 60 * 60 * 1000);   // Date.now() fetches current timestamp in milliseconds
    const files = await File.find({ createdAt: { $lt: past24hrDate } });

    if (files.length) {
        for (const file of files) {
            try {
                await file.deleteOne();
                console.log(`Successfully deleted ${file.filename}`);
            } catch (err) {
                console.log(`Error while deleting file: ${err}`);
            }
        }
    } else {
        console.log('Currently there is no such file to delete.');
    }
}

deleteFiles();   // calling this function every time the server is restarted, i.e., server made awake.

const PORT = process.env.PORT || 3000;   // if there's a port number specified 
// in the environment variables, use that. If not specified, use port 3000.

app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
});
