var request = require("request"),
    colors  = require("colors"),
    q       = require("q"),
    express = require("express"),
    http    = require("http");


request('https://venmo.com/api/v5/public', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var dataArray = JSON.parse(body).data;
    var dataLength = dataArray.length;
    var c;
    console.log(dataArray);
    
    console.log("#####################################################\n#####################################################".white.bold)
    for(var i = 0; i < dataLength; i = i + 1){
      c = dataArray[i]
      
      console.log("Payment ID: "+c.payment_id+"\n"+
                  "Story ID:   "+c.story_id+"\n"+
                  "From ID:    "+c.actor.id.red+"\n"+
                  "From:       "+c.actor.username.red+"\n"+
                  "To ID:      "+c.transactions[0].target.id.magenta+"\n"+
                  "To:         "+c.transactions[0].target.username.magenta+"\n"+
                  "Via:        "+c.via+"\n"+
                  "Type:       "+c.type+"\n"+
                  "Message:    "+c.message.green.bold+"\n");
    }
  };
});
