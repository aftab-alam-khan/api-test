const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

//Import Routes
const OrganizationRoute = require('./routes/organization/handlers');
const UserRoute = require('./routes/users/handlers');


dotenv.config();

// connect to DB 
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true })
    .then(() => console.log('connected to db successfull...'))
    .catch(err => console.log(err));

//Middleware
app.use(express.json()) // for parsing application/json

app.get('/health_check', (req, res) => {
    res.status(200).send(`Organization API's Health Check Looking good!.`);
});

//Route Middlewares
app.use('/api', OrganizationRoute);
app.use('/api', UserRoute);

module.exports = app;