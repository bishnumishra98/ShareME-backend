// This script deletes files from upload folder after 24 hours. It is scheduled in Heroku
// to run daily at 3:00AM to delete all files that are older than 24 hours at that time.

const File = require("./models/file");
const fs = require("fs");
const connectDB = require('./config/db');
connectDB();

// Delete all files older than 24 hours
async function fetchData() {
    const past24hrDate = new Date(Date.now() - 24 * 60 * 60 * 1000); // Date.now() fetches current timestamp in milliseconds
    const files = File.find({ createdAt: { $lt: past24hrDate } });
    console.log("File length:", files.length);

    if (files.length) {
        for (const file of files) {
            try {
                fs.unlinkSync(file.path);  // unlinkSync() deletes the file synchronously
                await file.remove();  // file gets deleted from database
                console.log(`Successfully deleted ${file.filename}`);
            } catch(err) {
                console.log(`Error while deleting file: ${err}`);
            }
        }
    }
    console.log('Job done!');
}

// Calling the fetchData() function
fetchData().then(() => {
    process.exit();
});
