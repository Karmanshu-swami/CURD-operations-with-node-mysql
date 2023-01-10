// https://www.youtube.com/watch?v=1aXZQcG2Y6I
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
require('dotenv').config();


// Parsing middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Parsing application / JSON
app.use(bodyParser.json());

// Express use static scss/css files from the public folder
app.use(express.static("public"));

// Template engine setup
app.engine('hbs', exphbs.engine({ extname: '.hbs' }));
app.set("view engine", ".hbs");

// Router
const router = require('./server/routes/routes');
app.use(router)


const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Listening to port ${port}`);
})