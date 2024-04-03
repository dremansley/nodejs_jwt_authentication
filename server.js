const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./database');
const passport = require("./passport-config");
const versionRoute = require('./routes/version');
const accountRoutes = require("./routes/Account");
const flash = require("express-flash");
const session = require("express-session")

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());

(async () => {
    try {

        await sequelize.authenticate();
        await sequelize.sync();

        const PORT = process.env.PORT || 8000;

        console.log('Successfully connected and synchronised with the database.');

        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        });

    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }
})();

app.use('/version', versionRoute);
app.use('/account', accountRoutes);
