const express = require('express');
const mongoose = require('mongoose');
const requireDir = require('require-dir');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/api-e-commerce', 
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
});

requireDir('./app/models');

app.use('/', require('./routes'));

app.listen(3333);