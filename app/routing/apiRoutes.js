var friendData = require("../data/friends.js")

module.exports = function(app) {

    app.get("/api/friends", function(req, res) {
        res.json(friendData);
    });

    app.post("/api/friends", function(req, res) {

        // Declares variable for questionaire answers. Used later for comparison
        var userScores = req.body.scores;
        
        var comparisonArray = []
        var yourNewFriend;

        // Loops Through friends.js API data
        for (var i = 0; i < friendData.length; i++) {
            
            // Declares variable for current array index
            var currentFriend = friendData[i];

            var totalDifference = 0;

            // Loops through currentFriend.scores and compares to userScores. Adds absolute value of difference to totalDifference
            for (var x = 0; x < currentFriend.scores.length; x++) {
                totalDifference += Math.abs(parseFloat(userScores[x]) - parseFloat(currentFriend.scores[x]));
            }

            // Once currentFriend.scores has been looped over, pushes whole object along with newly defined totalDifference value to comparisonArray
            comparisonArray.push({
                name: friendData[i].name,
                photo: friendData[i].photo,
                diff: totalDifference
            });
            
        };

        // Sorts Arrays by numeric value of .diff key
        function sortNumber(a, b) {
            return a.diff - b.diff;
        };

        // Applies Sort Function to comparisonArray
        comparisonArray.sort(sortNumber);

        // Sets yourNewFriend to comparisonArray with lowest diff value
        yourNewFriend = comparisonArray[0];

        // Pushes Survey Answers to friendData API
        friendData.push(req.body);

        // Returns yourNewFriend object
        res.json(yourNewFriend);
    });
};  