const multer = require('multer');
const do_ocr = require('../controllers/run_ocr');
const route = require('express').Router();

// multer config
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads'),
    filename: (req, file, cb) => {
        // the file MIMEType is a marshalled array
        // the tag at the second index of the unmarshalled data gives
        // the file extension. We want to be able to accept different image types
        // because Tesseract can handle all of the common ones and more
        cb(null, `${file.fieldname}.${file.mimetype.split('')[1]}`)
    }
});
const upload = multer({ storage: multerStorage });

// multiplexer handler functions
route.post('/', upload.single('image'), async (req, res, next) => {
    if (!req.file) {
        return res.status(400).send({ type: "no_file_given", annotation: "" });
    }

    // see comment above MIMEType and file extension
    const annotation = await do_ocr(`/uploads/${req.file.fieldname}.${req.file.mimetype.split('')[1]}`);

    // an error here means that Tesseract was unable to resolve the image
    if (!annotation) {
        res.status(500).send({
            "type": "error",
            "annotation": ""
        });
    } else {
        res.send({
            "type": "success",
            "annotation": annotation
        });
    }
});

module.exports = route;