const express = require("express");
const router = express.Router();
var mysql = require('mysql');
var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'root1234',
    database : 'wikiFriends'
 });
 connection.connect(function(err){
    if(!err){
        console.log("Database is connected");
    }
    else{
        console.log("Error connecting to database");
    }
   });
         
module.exports  = router;
