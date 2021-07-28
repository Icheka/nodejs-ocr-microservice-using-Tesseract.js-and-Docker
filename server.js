const express = require('express');

const PORT = 8080;
const HOST = '0.0.0.0';

const service = express();
service.get('/', (req, res) => {
    res.send('Hello Master!');
});

service.listen(PORT, HOST);

console.log(`Started service on http://${HOST}:${PORT}`);