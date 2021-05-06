const express = require('express');
// const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const api = require('./server/routes/api');
// const port=3000;
const port = process.env.PORT || 1000;

const app = express();

app.use(cors());    

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
});

app.use(express.static(path.join(__dirname, 'dist')));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use('/api', api);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(port, function () {
    console.log("Server running on localhost:" + port);
});