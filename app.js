var request = require("request"),
    colors  = require("colors"),
    q       = require("q"),
    express = require("express"),
    http    = require("http");


request('https://venmo.com/api/v5/public', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var dataArray = JSON.parse(body).data,
        dataLength = dataArray.length,
        c,
        actorFacebookUrl,
        targetFacebookUrl;

    function getFacebookUrl(pictureUrl) {
      if (pictureUrl !== undefined) {
        if (pictureUrl.indexOf("facebook") >= 0) {
          return "("+"https://www.facebook.com/".bold+pictureUrl.split("/")[3].bold+")";
        } else {
          return ""
        };
      } else {
        return ""
      }
    };

    console.log("#####################################################\n#####################################################".white.bold)
    for(var i = 0; i < dataLength; i = i + 1){
      c = dataArray[i]

      actorFacebookUrl = getFacebookUrl(c.actor.picture);
      targetFacebookUrl = getFacebookUrl(c.transactions[0].target.picture);

      console.log("Payment ID: "+c.payment_id+"\n"+
                  "Story ID:   "+c.story_id+"\n"+
                  "Permalink:  https://www.venmo.com"+c.permalink+"\n"+
                  "From ID:    "+c.actor.id+"\n"+
                  "From:       "+c.actor.username.red.bold+" "+actorFacebookUrl+"\n"+
                  "To ID:      "+c.transactions[0].target.id+"\n"+
                  "To:         "+c.transactions[0].target.username.magenta.bold+" "+targetFacebookUrl+"\n"+
                  "Via:        "+c.via+"\n"+
                  "Type:       "+c.type+"\n"+
                  "Message:    "+c.message.green.bold+"\n");
    }
  };
});
