// This is the route for download page

const router = require('express').Router();
const File = require('../models/file');

router.get('/:uuid', async (req, res) => {
    try {
        const file = await File.findOne({ uuid: req.params.uuid });

        // If file not found
        if(!file) {
            return res.render('download', {error: 'This link has expired.'});
        }
        
        return res.render('download', {
            uuid: file.uuid,
            fileName: file.filename,
            fileSize: file.size,
            downloadLink: `${process.env.APP_BASE_URL}/files/download/${file.uuid}`
        });
    } catch(err) {
        return res.render('download', { error: 'Something went wrong.'});
    }
});

module.exports = router;
