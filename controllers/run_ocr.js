const tesseract = require('node-tesseract-ocr');
const fs = require('fs');

// ocrAnnotationConfig: map of options for native Tesseract binary
const ocrAnnotationConfig = {
    lang: 'eng',
    oem: 3,
    psm: 3
};

const start = async (filePath) => {
    try {
        const file = fs.readFileSync(process.cwd() + filePath);

        const annotation = await tesseract.recognize(file, ocrAnnotationConfig);

        // about console.log:
        // depending on the server setup, leaving these logs here might be 
        // 'caught' and saved to the logfile (this works in most cloud service: Heroku, AWS, etc)
        // in any case, it's still a good idea to just leave these here for easy debugging
        console.log('Result :>>', annotation);
        return annotation;
    } catch (err) {
        console.error('An error occurred! :>>', err);
        return null;
    }
}

module.exports = start;