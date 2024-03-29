const express = require('express');
const app = express();
const connectDB = require('./config/db');
connectDB();
const path = require('path');   // path is an in-built node.js module

app.use(express.static('public'));   // app.use() is a  built-in method used to mount middleware functions.
// express.static() is a built-in middleware function in Express.js to serve static files such as HTML,
// images, CSS, JavaScript, etc., from a specified directory.

// Template engine
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

// Routes
app.use('/api/files', require('./routes/files'));
app.use('/files', require('./routes/show'));


const PORT = process.env.PORT || 3000;   // if there's a port number specified 
// in the environment variables, use that. If not specified, use port 3000.

app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
});
