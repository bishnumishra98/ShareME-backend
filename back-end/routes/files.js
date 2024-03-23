const router = require('express').Router();
const multer = require('multer');
const File = require('../models/file');
const {v4: uuid4} = require('uuid');

let storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => {
        // For every file uploaded, we will create an unique name for it before storing it in DB to avoid clashes.
        // The unique file name may look somewhat like this: 34469761359-56976254976238.jpg
        const uniqueName = `${Date.now()}-${Math.round(Math.random()*1E9)}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    }
});

let upload = multer({
    storage: storage,
    limit: {fileSize: 1000000 * 100},
}).single('myfile');

router.post('/', (req, res) => {
    // Store files coming under uploads folder
    upload(req, res, async (err) => {
        // Validate request
        if(!req.file) {
            return res.json({error: "No file found."});
        }

        if(err) {
            return res.status(500).send({error: err.message});
        }

        // Store files into MongoDB
        const file = new File({
            filename: req.file.filename,
            uuid: uuid4(),
            path: req.file.path,
            size: req.file.size
        });

        const response = await file.save();
        // Send response which will contain link to download file. It may look somewhat like this: http://localhost:3000/files/12648jhldouhe-234bhjsbhkdhj
        return res.json({file: `${process.env.APP_BASE_URL}/files/${response.uuid}`});
    });

    

    


});

module.exports = router;

// Extra Knowledge: Multer is a popular middleware for Node.js that simplifies handling
// multipart/form-data which is primarily used for uploading files. It acts as a bridge
// between the raw form data received from an HTML form submission and your Node.js application.
// In our project, it will be helpful in storing file.