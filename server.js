const express = require('express');
const fs = require('fs');
const logger = require('morgan');
const indexRoute = require('./routes/indexRoute');

const PORT = 8080;
const HOST = '0.0.0.0';
const LOG_FILE_PATH = './logs.log';

const service = express();

service.use(express.json());
service.use(express.urlencoded({ extended: true }));
service.use(logger('common', {
    stream: fs.createWriteStream(LOG_FILE_PATH, { flags: 'a' })
}));

service.use('/', indexRoute);

service.listen(PORT, HOST);

console.log(`Started service on http://${HOST}:${PORT}`);