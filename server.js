var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname+"public")));

// var routes1 = require("./routing/apiroutes.js");
// app.use(routes1);

// var routes2= require("./routing/htmlroutes.js");
// app.use(routes2);

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "./app/views/home.html"));
});
  
app.get("/survey", function(req, res) {
    res.sendFile(path.join(__dirname, "./app/views/survey.html"));
});


var friends = require("./app/data/friends.js");
// Displays all characters
app.get("/api/friends", function(req, res) {
    return res.json(friends);
  });
  

  app.post("/api/friends", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var chosen = req.body;
    var inputScore = chosen.scores;
    console.log("......."+inputScore[0]);
    var previousDiff = 99999999;
    var index;
    for (var i = 0; i < friends.length; i++) {
      var score = friends[i].scores;
      var diff= 0;     
      for(var j=0;j<score.length;j++){
        diff = diff + Math.abs(inputScore[j] - score[j]);
      }
      if(diff < previousDiff){
        previousDiff = diff;
          index = i;
      } 
  
    }   
  
    return res.json(friends[index]);
  });
  
  // // Displays a single character, or returns false
  // app.get("/api/friends/:friend", function(req, res) {
  //   var chosen = req.params.friend;
  //   var inputScore = chosen.scores;
  //   console.log("......."+inputScore[0]);
  //   var previousDiff = 99999999;
  //   var index;
  //   for (var i = 0; i < friends.length; i++) {
  //     var score = friends[i].scores;
  //     var diff= 0;     
  //     for(var j=0;j<score.length;j++){
  //       diff = diff + Math.abs(inputScore[j] - score[j]);
  //     }
  //     if(diff < previosDiff){
  //         previosDiff = diff;
  //         index = i;
  //     } 
  
  //   }   
  
  //   return res.json(friends[index]);
  // });
  
  // Create New Characters - takes in JSON input
  app.post("/api/friends", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newfriend = req.body;
  
    console.log(newfriend);
  
    // We then add the json the user sent to the character array
    friends.push(newfriend);
  
    // We then display the JSON to the users
    res.json(newfriend);
  });

  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  