var express = require("express");
var router = express.Router();
var friends = require("../data/friends.js");
// Displays all characters
router.get("/api/friends", function(req, res) {
    return res.json(friends);
});
  

router.post("/api/friends", function(req, res) {
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

module.exports = router;