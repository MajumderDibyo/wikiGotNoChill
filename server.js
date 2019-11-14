const express = require("express");
const bodyParser = require("body-parser");
var bcrypt = require('bcrypt');
const session = require('express-session');

const profile = require("./routes/api/profile");
//const register  = require('./routes/api/register');
const config    = require('./routes/api/config');


// Initialization of express
const app = express();

//session initialization
app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));


// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Setting an initial route which says "Hello World " Just for check
app.get("/", (req, res) => res.send("Hello World"));

app.use("/api/profile", profile);
//app.use('/api/register', register)
app.use('/api/config', config);



// Defining the port - process.env.PORT - when deployed in heroku default port number is used
const port = process.env.PORT || 5000;

// It makes the express app to listen to that specific port and returns some text showing its port number
app.listen(port, () => console.log(`Server running in port ${port}`));