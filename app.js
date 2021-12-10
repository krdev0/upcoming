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

    const months = Array.from({ length: 12 }, (item, i) => {
        return new Date(0, i).toLocaleString('en-US', { month: 'long' })
    });

    const date = new Date();
    const currentMonth = date.getMonth() + 1;

    console.log(currentMonth);
    const currentDate = date.getDate();

    const currentMonthEvents = [];

    //Loop over events and push to array only if the date corresponds to current date
    for (const event of eventsData) {
        const splitDate = (event.date).split("-");

        // event.year = Number(splitDate[0]);
        event.month = Number(splitDate[1]);
        event.day = Number(splitDate[2]);

        if (currentMonth === event.month && currentDate <= event.day) {
            currentMonthEvents.push(event);
        }
    }

    currentMonthEvents.sort((a, b) => parseFloat(a.day) - parseFloat(b.day));

    res.render('index', {
        events: currentMonthEvents,
        months: months,
        currentMonth: months[currentMonth - 1],
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