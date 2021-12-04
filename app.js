const path = require('path');
const fs = require('fs');

const express = require('express');
const app = express();

// Adding ejs as view engine and adding template file path
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Use to serve static files from assets folder
app.use(express.static('assets'));

app.get('/', function (req, res) {
    res.render('index');
})

app.post('/', function (req, res) {
    res.redirect('/asd');
})

app.listen(3000);