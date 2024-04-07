const File = require("./models/file");
const connectDB = require('./config/db');
connectDB();

// Delete all files older than 24 hours
async function deleteFiles() {
    const past24hrDate = new Date(Date.now() - 24 * 60 * 60 * 1000);   // Date.now() fetches current timestamp in milliseconds
    const files = await File.find({ createdAt: { $lt: past24hrDate } });
    console.log("File length:", files.length);

    if (files.length) {
        for (const file of files) {
            try {
                await file.deleteOne();
                console.log(`Successfully deleted ${file.filename}`);
            } catch (err) {
                console.log(`Error while deleting file: ${err}`);
            }
        }
    }
    console.log('Job done!');
}

module.exports = deleteFiles;
