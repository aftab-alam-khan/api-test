
const Mongoose = require('mongoose');

//load database
Mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true });
const db = Mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback() {
    console.log('Connection with database succeeded.');
});

module.exports = db;