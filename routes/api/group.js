const mysql = require("mysql");
const express = require("express");
const bcrypt = require("bcrypt");
//const connection = require('./config');
const router = express.Router();
var connection = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "root1234",
  database: "wikiFriends"
});
connection.connect(function(err) {
  if (!err) {
    console.log("Database is connected");
  } else {
    console.log("Error connecting to database");
  }
});


// test 

router.get("/test", (req, res) => {
  res.json({
    msg: "User Profile Works"
  });
});

router.post("/create", (req, res) => {
  var tag = req.body.tag;
  var name = req.body.name;
  var createrId = req.body.user_id;
  connection.query(
    "INSERT INTO group_name(creator_id, group_name, tag) values(?, ?, ?)",
    [createrId, name, tag],
    function(error, results, fields) {
      if (error) {
        console.log("error ocurred", error);
        res.send({
          code: 400,
          failed: "error ocurred"
        });
      } else {
        res.send({
          code: 200,
          status: "group created"
        });
      }
    }
  );
});

router.post("/join/:gid", (req, res) => {
  var sess = req.session;
  var user_id = sess.user_id;
  var group_id = req.params.gid;

  console.log("Sess", user_id);
  connection.query(
    "INSERT INTO users_in_group(group_id, user_id) values(?,?)",
    [group_id, user_id],
    function(error, results, fields) {
      if (error) {
        console.log(("error occoured", error));
        res.send({
          code: 400,
          status: "failed"
        });
      } else {
        res.send({
          code: 200,
          status: "joined group"
        });
      }
    }
  );
});

router.post("/post/:gid", (req, res) => {
  var sess = req.session;
  var group_id = req.params.gid;
  var content = req.body.content;
  var user_id = sess.user_id;
  console.log(sess);
  connection.query(
    "INSERT INTO posts(post_content, likes_count) values(?, 0)",
    [content],
    function(error, results, fields) {
      if (error) {
        console.log("error ocurred", error);
        res.send({
          code: 400,
          failed: "error ocurred"
        });
      } else {
        connection.query(
          "SELECT post_id FROM posts ORDER BY post_id DESC LIMIT 1",
          function(error, results, fields) {
            if (error) {
              console.log("error occoured", error);
              res.send({
                code: 400,
                status: "error occoured"
              });
            } else {
              var post_id = results[0].post_id;
              //console.log(sess.user_id);
              connection.query(
                "INSERT INTO group_posts(group_id, post_id, user_id) values (?,?,?)",
                [group_id, post_id, user_id],
                function(error, results, fields) {
                  if (error) {
                    console.log("error ocurred", error);
                    res.send({
                      code: 400,
                      failed: "error ocurred"
                    });
                  } else {
                    res.send({
                      code: 200,
                      status: "successfully posted in group"
                    });
                  }
                }
              );
            }
          }
        );
      }
    }
  );
});

router.post("/like/:post_id", (req, res) => {
  var post_id = req.params.post_id;
  connection.query(
    "SELECT likes_count from posts where post_id = ?",
    [post_id],
    function(error, results, fields) {
      if (error) {
        console.log("error ocurred", error);
        res.send({
          code: 400,
          failed: "error ocurred"
        });
      } else {
        var likes = results[0].likes_count;
        likes++;
        connection.query(
          "UPDATE posts set likes_count = ? where post_id = ?",
          [likes, post_id],
          function(error, results, fields) {
            if (error) {
              console.log("error occoured", error);
              res.send({
                code: 400,
                status: "failed"
              });
            } else {
              res.send({
                code: 200,
                status: "success"
              });
            }
          }
        );
      }
    }
  );
});

router.post("/fetchUsers/:gid", (req, res) => {
  var group_id = req.params.gid;
  connection.query(
    "SELECT user_id from users_in_group where group_id = ?",
    [group_id],
    function(error, results, fields) {
      if (error) {
        console.log("error occoured", error);
        res.send({
          code: 400,
          status: "failed"
        });
      } else {
        var objs = [];
        for (var i = 0; i < results.length; i++) {
          objs.push({ user_id: results[i].user_id });
        }
        res.end(JSON.stringify(objs));
      }
    }
  );
});

// @route   POST /fetchPosts/:gid
// @desc    Fetching posts of a group
// @access  Auth based

router.post("/fetchPosts/:gid", (req, res) => {
  var group_id = req.params.gid;
  var objs = [];
  connection.query(
    "SELECT post_id, user_id from group_posts where group_id = ?",
    [group_id],
    function(error, results, fields) {
      if (error) {
        console.log("error occoured", error);
        res.send({
          code: 400,
          status: "failed"
        });
      } else {
        for (var i = 0; i < results.length; i++) {
          var post_id = results[i].post_id;
          var user_id = results[i].user_id;
          connection.query(
            "SELECT post_content, likes_count from posts where post_id = ?",
            [post_id],
            function(error, result, fields) {
              if (error) {
                console.log("error occoured", error);
                res.send({
                  code: 400,
                  status: "failed"
                });
              } else {
                objs.push({
                  userid: user_id,
                  postid: post_id,
                  content: result[0].post_content,
                  likes: result[0].likes_count
                });
              }
            }
          );
        }
        res.end(JSON.stringify(objs));
      }
    }
  );
});

// @route   POST /fetchGroups
// @desc    Fetch Groups of a user
// @access  Public


router.post("/fetchGroups", (req, res) => {
  var sess = req.session;
  var user_id = sess.user_id;
  //console.log(user_id);
  var objs = [];
  //objs.push({get: 1, set:2});
  connection.query(
    "select g.group_name, g.group_id from group_name as g, users_in_group as us where us.user_id = ? and g.group_id = us.group_id",
    [user_id],
    function(error, results, fields) {
      if (error) {
        console.log("error occoured", error);
        res.send({
          code: 400,
          status: "failed"
        });
      } else {


        for(var i=0;i< results.length;i++){
          objs.push({group_id: results[i].group_id, group_name: results[i].group_name});
        }

        // async.forEachOf(results, function(res, i, inner_callback) {
        //   var group_id = res.group_id;
        //   connection.query(
        //     "SELECT group_name from group_name where group_id = ?",
        //     [group_id],
        //     function(error, result, fields) {
        //       if (error) {
        //         console.log("error occoured", error);
        //         res.send({
        //           code: 400,
        //           status: "failed"
        //         });
        //       } else {
        //         objs.push({
        //           userid: group_id,
        //           group_name: result[0].group_name
        //         });
        //         console.log(objs[i]);
        //       }
        //     }
        //   );
        // }),
        //   function(err) {
        //     if (!err) res.end(JSON.stringify(objs));
        //   };
          //   var group_id = results[i].group_id;
          //   //console.log("test");
          //   //console.log(group_id);
          //   connection.query("SELECT group_name from group_name where group_id = ?",[group_id], function(error, result, fields){
          //     if(error){
          //       console.log("error occoured", error);
          //       res.send({
          //         "code":400,
          //         "status" : "failed"
          //       });
          //     }
          //     else{
          //       //console.log("grp_id", group_id);
          //       //console.log("grp_name",result[0].group_name);

          //       //var grp = group_id;
          //       //var gpname = result[0].group_name;

          //       objs.push({userid: grp, group_name: result[0].gpname});
          //       console.log(objs[i]);
          //     }
          // });
          // console.log("obos", objs);
        

        res.end(JSON.stringify(objs));
      }
    }
  );
});

// @route   POST /groupSuggestions
// @desc    Filter groups by tags
// @access  Public

router.post("/groupSuggestions", (req, res) => {
  var user_id = sess.user_id;
  connection.query(
    "SELECT tag from interests where type = 1 and user_id = ?",
    [user_id],
    function(error, results, fields) {
      if (error) {
        console.log("error occoured", error);
        res.send({
          code: 400,
          status: "failed"
        });
      } else {
        for (var i = 0; i < results.length; i++) {
          var tag = results[i].tag;
          var objs = [];
          connection.query(
            "SELECT group_id, group_name from group_name where tag = ?",
            [tag],
            function(error, results, fields) {
              if (error) {
                console.log("error occoured", error);
                res.send({
                  code: 400,
                  status: "failed"
                });
              } else {
                objs.push(
                  { groupid: group_id },
                  { groupname: group_name },
                  { tags: tag }
                );
              }
            }
          );
        }
        res.end(JSON.stringify(objs));
      }
    }
  );
});
module.exports = router;
