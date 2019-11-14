// WIll have things like bio, location, and other descriptions
const mysql = require("mysql");
const express = require("express");
const bcrypt = require('bcrypt');
//const connection = require('./config');
const router = express.Router();

// bcrypt salt
var salt = bcrypt.genSaltSync(10);

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


// @route   POST api/profile/
// @desc    Registration Page
// @access  Public


router.post("/",(req,res) => {
  var pass = bcrypt.hashSync(req.body.password, salt);
  var users = {
    "user_id" : req.body.user_id,
    "password" : pass,
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

// @route   POST api/profile/login
// @desc    LOgin Page
// @access  Public

router.post('/login',(req,res)=> {
  var user_id = req.body.user_id;
    var password = req.body.password;
    connection.query("SELECT user_id, password from users where user_id = ?",[user_id], function(error, results, fields){
        if(error){
            res.send({
                "code" : 400,
                "status": "error occoured"
                });
        }
        else{
            if(results.length > 0){
            if(bcrypt.compareSync(password,results[0].password)){
             res.send({
            "code":200,
            "status":"login sucessfull"
           });
           }
         else{
         res.send({
              "code":204,
             "status":"userid and password does not match"
            });
         }
     }
    else{
      res.send({
        "code":204,
        "status":" does not exits"
          });
    }
  }
  });
})

module.exports = router;
