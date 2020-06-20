const express = require("express");
const db = require("./models");
const app = express();
const PORT = 5000 || process.env.PORT;
const passport = require('passport');
const path = require('path');

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

// Passport middleware
app.use(passport.initialize());

// Passport Config

//Routes

db.sequelize.authenticate()
    .then(() => {
        console.log("Connection established.")
    })
    .catch(err => console.error(err.message))


db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`on port ${PORT}`);
    })
})

console.log("Hello world");


// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}