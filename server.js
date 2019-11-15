const express = require("express");
const bodyParser = require("body-parser");
var bcrypt = require('bcrypt');
const session = require('express-session');
var cors = require('cors');

const profile = require("./routes/api/profile");
const post = require("./routes/api/post");
const group = require("./routes/api/group");


//const register  = require('./routes/api/register');
const config    = require('./routes/api/config');


// Initialization of express
const app = express();

//session initialization
app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));

// session variable
var sess;

app.use(cors());


// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Setting an initial route which says "Hello World " Just for check
app.get("/", (req, res) => res.send("Hello World"));

app.use("/api/profile", profile);
app.use("/api/post", post);
app.use("/api/group", group);



//app.use('/api/register', register)
app.use('/api/config', config);

// app.listen(3000, function () {
//     console.log('CORS-enabled web server listening on port 80')
//   })
  

// Defining the port - process.env.PORT - when deployed in heroku default port number is used
const port = process.env.PORT || 5000;

// It makes the express app to listen to that specific port and returns some text showing its port number
app.listen(port, () => console.log(`Server running in port ${port}`));