// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friendData = require("../data/friendData");
//var waitListData = require("../data/waitinglistData");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function(req, res) {
    res.json(friendData);
  });

  // app.get("/api/waitlist", function(req, res) {
  //   res.json(waitListData);
  // });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

  app.post("/api/friends", function(req, res) {
    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    // req.body is available since we're using the body-parser middleware
    // if (tableData.length < 5) {
    //   tableData.push(req.body);
    //   res.json(true);
    // }
    // else {
    //   waitListData.push(req.body);
    //   res.json(false);
    // }

    var datareceived = req.body;
    var userscore = datareceived.scores;
    var closestmatchscore= 1000000;
    var closestmatch =[];
    console.log("got a post");
    console.log(userscore);

    //res.json(friendData);

    for (var i=0; i<friendData.length; i++){

      var matchdifferece = 0;
      
      for (var j=0; j<friendData[i].Scores.length; j++){

        matchdifferece += Math.abs(friendData[i].Scores[j]-userscore[j]);
        console.log("Match difference");
        console.log("in DB: " + friendData[i].Scores[j] + " | user input: " + userscore[j] + " |accumulate: "+ matchdifferece);
       }

       if (closestmatchscore>matchdifferece){
        console.log("Match updated with array" + i);
        closestmatchscore = matchdifferece;
        closestmatch = friendData[i];
        console.log("Closestmatch is:");
        console.log(closestmatch);
    
       }

       else{
         console.log("No change");
       }


      }

      res.json(closestmatch);  
      // closestmatch =[];
      // closestmatchscore= 1000000;
  });

  // ---------------------------------------------------------------------------
  // I added this below code so you could clear out the table while working with the functionality.
  // Don"t worry about it!

  // app.post("/api/clear", function() {
  //   // Empty out the arrays of data
  //   tableData = [];
  //   waitListData = [];

  //   console.log(tableData);
  // });
};
