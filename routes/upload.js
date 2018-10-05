const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage,
    limits: {
        fileSize: 2 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
            const err = new Error('Extention');
            err.code = "EXTENTION"
            return cb(err)
        }
        cb(null, true)
    }
}).single('file')

router.post('/image', (req, res) => {
    upload(req, res, err => {
        let error = '';
        if (err) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                error = "Картинка не более 2MB"
            }
            if (err.code === 'EXTENTION') {
                error = "Только Jpeg And Png!"
            }
        }

        res.json({
            ok: !error,
            error
        });
    });
});

module.exports = router;