// WIll have things like bio, location, and other descriptions
const mysql = require("mysql");
const express = require("express");
const bcrypt = require('bcrypt');

//const connection = require('./config');
const router = express.Router();

// bcrypt salt
var salt = bcrypt.genSaltSync(10);

// session variable
//var sess;



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
              sess = req.session;
              sess.user_id = user_id;

              console.log("Session",sess);
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

// @route   POST api/profile/viewFriends
// @desc    View Friends of users
// @access  Private

router.post("/viewFriends", (req, res) =>{
  var sess = req.session;
  var user_id = sess.user_id;
  var objs = [];
  connection.query("select user_two, close_friend from friendship where user_one = ?",[user_id],function(error, results, fields){
      if(error){
          res.send({
              "code" : 400,
              "status": "error occoured"
              });
      }
      else{

        for(var i = 0; i < results.length; i++){
          objs.push({friend_id: results[i].user_two, close_friend: results[i].close_friend});
        }
        res.end(JSON.stringify(objs));
      }
    }
  );
});

// @route   POST api/profile/viewBio
// @desc    View Friends of users
// @access  Public

router.post("/viewBio",(req, res) =>{
  var sess = req.session;
  var user_id = sess.user_id;
  var objs = [];
  connection.query("select name, dob, avator, gender, bio from users where user_id = ?", user_id, function(error, results, fields){
      if(error){
          res.send({
              "code" : 400,
              "status": "error occoured"
              });
      }
      else{
        objs.push({name : results[0].name, dob: results[0].dob, avator: results[0].avator, gender: results[0].gender, bio: results[0].bio});
        res.end(JSON.stringify(objs));
      }});
});

// @route   POST api/profile/viewInterests
// @desc    View Friends interests
// @access  Public

router.post("/viewInterests", (req, res) =>{
  var sess = req.session;
  var user_id = sess.user_id;
    connection.query("select type, tag from interests where user_id = ?",[user_id], function(error, results, fields){
      if(error){
          res.send({
              "code" : 400,
              "status": "error occoured"
              });
      }
      else{
        var objs = [];
        objs.push({type: results[0].type, tag: results[0].tag});
        res.end(JSON.stringify(objs));
      }});

});

// @route   POST /viewFriendsProfile/:fid
// @desc    Search Friends Profile
// @access  Public

router.post("/viewFriendsProfile/:fid", (req, res) =>{
  var sess = req.session;
  var user_id = sess.user_id;
  var fid = req.params.fid;
  var objs = [];
  connection.query("select close_friend from friendship where user_one = ? and user_two = ?",[user_id, fid], function(error, results, fields){
    if(error){
        res.send({
            "code" : 400,
            "status": "error occoured"
            });
    }
    else{
      var wishlist;
      var close_friend = parsrInt(results[0].close_friend);
      if(close_friend == 1){
      //implement wishlist here
      }
      else{
        wishlist = null;
      }
      connection.query("select name, dob, avator, gender, bio from users where user_id=?",[fid], function(error, results, fields){
        if(error){
            res.send({
                "code" : 400,
                "status": "error occoured"
                });
        }
        else{
          var group_interests = [];
          connection.query("select tags from interests where user_id = ? and type = ?", [user_id, type], function(error, result, fields){
            if(error){
                res.send({
                    "code" : 400,
                    "status": "error occoured"
                    });
            }
            else{

              for(var i = 0; i < result.length; i++){
                group_interests.push({interests:result[i].tags})
              }
              objs.push({name:results[0].name, dob:results[0].dob, avator: results[0].avator, gender: results[0].gender, bio: results[0].bio, groupinterests: group_interests, wishlist:wishlist});
              res.end(JSON.stringify());
            }
            })
        }});

      } });
  
  });

// @route   POST /addFriend/:fid
// @desc    Add Friends with userID
// @access  Private

router.post("/addFriend/:fid", (res, req) => {
  var sess = req.session;
  var user_id = sess.user_id;
  var fid = req.params.fid;
  connection.query("INSERT INTO friendship(user_one, user_two, close_friend) values(?,?,0)",[user_id, fid], function(error, result, fields){
    if(error){
        res.send({
            "code" : 400,
            "status": "error occoured"
            });
    }
    else{
      res.send({
        "status" : "sucessfull",
        "code" : 200
      });

    }});

});

// @route   POST /addCloseFriends/:fid
// @desc    Add Close friends by userID
// @access  Public

router.post("/addCloseFriends/:fid", (res, req)=>{
  var sess = req.session;
  var user_id = sess.user_id;
  var fid = sess.fid;
  connection.query("INSERT INTO friendship where user_one = ? and user_two = ?")
})

module.exports = router;
