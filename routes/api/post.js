const mysql = require("mysql");
const express = require("express");
const bcrypt = require('bcrypt');
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
 router.get("/test", (req, res) => {
   res.json({
     msg: "User Profile Works"
   });
 });
 router.get("/create", (req, res) =>{
   var user_id = req.body.user_id;
        var content = req.body.content;
        var likes_count = 0;
        connection.query("INSERT INTO posts(post_content, likes_count) values (?,0)",[content],function (error, results, fields) {
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
                "success":"post created!"
         });
       }
     });
     connection.query("SELECT post_id FROM posts ORDER BY post_id DESC LIMIT 1", function(error, results, fields){
        if(error) {
               res.send({
                "code" : 400,
                "status": "error occoured"
                });
        }
        else{
            var post_id = results[0].post_id;
            connection.query("INSERT INTO common_posts(user_id, post_id)values(?,?)",[user_id],[content], function(error, results, fields){
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
                   "success":"common_posts created chill!!"
                 });
              }
            });
          }});
        });
