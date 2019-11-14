// WIll have things like bio, location, and other descriptions
const mysql = require("mysql");
const express = require("express");
//const connection = require('./config');
const router = express.Router();

var connection = mysql.createConnection({
  host : 'localhost',
  port:'3306',
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

// @route   GET api/profile/test
// @desc    Tests Posts Route
// @access  Public

router.get("/test", (req, res) => {
  res.json({
    msg: "User Profile Works"
  });
});

router.post("/",(req,res) => {
  var users = {
    "user_id" : req.body.user_id,
    "password" : req.body.password,
    "name":req.body.name,
    "dob":req.body.dob,
    "avator":req.body.avator,
    "gender" : req.body.gender,
    "bio" : req.body.bio
    };
    connection.query('INSERT INTO users SET ?',users, function (error, results, fields) {
if (error) {
    console.log("error ocurred",error);
    res.send({
     "code":400,
    "failed":"error ocurred"
    })
}else{
 console.log('The solution is: ', results);
    res.send({
      "code":200,
      "success":"user registered sucessfully"
     });
 }
 });
})

module.exports = router;
