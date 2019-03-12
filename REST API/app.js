const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const feedRoutes = require('./routes/feed');

const app = express();

app.use(bodyParser.json());
//for images
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
    //this next send control to next middlerware
});

app.use('/feed', feedRoutes);
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.status;
    //this come from that text we passed inside error
    const message = error.messsage;
    res.status(status).json({
        message: message
    });
})

mongoose.connect(
    'mongodb+srv://ravinder:mongodb@cluster0-lqmww.mongodb.net/message?retryWrites=true',
    { useNewUrlParser:
        true }
)
.then(result => {
    app.listen(8080);
})
.catch(err => console.log(err));
