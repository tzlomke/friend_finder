var friendData = require("../data/friends.js")

module.exports = function(app) {

    app.get("/api/friends", function(req, res) {
        res.json(friendData);
    });

    app.post("/api/friends", function(req, res) {
        var userScores = req.body.scores;

        for (var i = 0; i < friendData.length; i++) {
            var totalDifference = 0;
            var currentFriendScores = friendData[i].scores;
            console.log("Current Friend Scores: " + currentFriendScores);

            for (var i = 0; i < currentFriendScores.length; i++) {
                totalDifference += Math.abs(parseInt(currentFriendScores[i]) - parseInt(userScores[i]));
                console.log("Total Diff: " + totalDifference);
            };
            
        }

        friendData.push(req.body);
        res.json(true);
    });
};  