const Mongoose = require('mongoose');

//load database
Mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, });

const db = Mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback() {
    console.log('Connection Open with database succeeded.');
});
db.on('connected', () => console.log('Mongoose connected to db...'));
db.on('disconnected', () => console.log('Mongoose connection is disconnected...'));

process.on('SIGINT', () => {
    db.close(() => {
        console.log('Mongoose connection is disconnected due to app termination...');
        process.exit(0);
    });
});

module.exports = db;
