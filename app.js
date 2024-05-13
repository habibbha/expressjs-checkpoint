const express = require('express');
const app = express();
const path = require('path');
const PORT =  3000;

// Middleware to serve static files (e.g., CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to define the working hours restriction
const checkWorkingHours = (req, res, next) => {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const hourOfDay = now.getHours();

    if (dayOfWeek >= 1 && dayOfWeek <= 5 && hourOfDay >= 9 && hourOfDay < 17) {
        next(); // Continue to the next middleware/route handler
    } else {
        res.send('Sorry, the web application is only available during working hours (Monday to Friday, from 9 to 17).');
    }
};

app.use(checkWorkingHours);

// Routes
app.get('/home', (req, res) => {
    res.sendFile(__dirname + '/public/home.html');
});

app.get('/services', (req, res) => {
    res.sendFile(__dirname + '/public/services.html');
});

app.get('/contact', (req, res) => {
    res.sendFile(__dirname + '/public/contact.html');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});













