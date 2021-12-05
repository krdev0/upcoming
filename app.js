const path = require('path');
const fs = require('fs');

const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Adding ejs as view engine and adding template file path
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Use to serve static files from assets folder
app.use(express.static('assets'));

app.get('/', function (req, res) {
    const dataFile = fs.readFileSync('data/data.json');
    const eventsData = JSON.parse(dataFile);

    const date = new Date();
    const currentMonth = date.getMonth();

    let eventsCurrentMonth = [];

    //Loop over events and push to array only if the date corresponds to current date
    for (const data of eventsData) {
        console.log(data.date);
    }

    const months = Array.from({ length: 12 }, (item, i) => {
        return new Date(0, i).toLocaleString('en-US', { month: 'long' })
    });

    res.render('index', {
        events: eventsData,
        months: months,
        currentMonth: months[currentMonth]
    });
});

app.post('/', function (req, res) {
    const event = req.body;

    const dataFile = fs.readFileSync('data/data.json');
    const eventsData = JSON.parse(dataFile);

    eventsData.push(event);

    fs.writeFileSync('data/data.json', JSON.stringify(eventsData));

    res.redirect('confirm');
});

app.get('/confirm', function (req, res) {
    res.render('confirm');
});

app.listen(3000);