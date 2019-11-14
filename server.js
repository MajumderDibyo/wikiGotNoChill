const express = require("express");
const bodyParser = require("body-parser");

// Initialization of express
const app = express();

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Setting an initial route which says "Hello World " Just for check
app.get("/", (req, res) => res.send("Hello World"));

// Defining the port - process.env.PORT - when deployed in heroku default port number is used
const port = process.env.PORT || 5000;

// It makes the express app to listen to that specific port and returns some text showing its port number
app.listen(port, () => console.log(`Server running in port ${port}`));