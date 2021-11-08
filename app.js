const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

//Import Routes
// const createOrganizationRoute = require('./routes/organization/createOrganization');
// const deleteOrganizationRoute = require('./routes/organization/deleteOrganization');
// const getOrganizationRoute = require('./routes/organization/getOrganization');
// const updateOrganizationRoute = require('./routes/organization/updateOrganization');
// const createUserRoute = require('./routes/users/createUser');
// const authenticateUserRoute = require('./routes/users/authenticateUser');
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
    res.status(200).send(`Organization API's Health Check`);
});

//Route Middlewares
// app.use('/api', createOrganizationRoute);
// app.use('/api', deleteOrganizationRoute);
// app.use('/api', getOrganizationRoute);
// app.use('/api', updateOrganizationRoute);
// app.use('/api', createUserRoute);
// app.use('/api', authenticateUserRoute);
app.use('/api', OrganizationRoute);
app.use('/api', UserRoute);

module.exports = app;