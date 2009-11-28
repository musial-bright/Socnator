/* Adam Musial-Brihgt
 * 
 * Socnator (SOCial Network aggregaTOR)
 * Liobrary for network web services access.
 *
 * @require jQuery, ExtJS
 */
(function() {

	var config = {
		"twitterImage" : true,
		"twitterUserName" : "amusial",
		"twitterUserAttributes" : ["name", "description", "location"],
		"userName" : "Adam Musial-Bright"
	};

  // tweets = [["Tweet1"],["Tweet2"]]
  var tweets = Array();
  var twitterImageSrc = '';
  var twitterUserDescription = new Array();

  socnator = {

	  getTweetsAsArray : function() { return tweets; },
    
    getUserName : function() { return config.userName; },
    
    getTwitterImage : function() { return twitterImageSrc; },
    
    getTwitterUserDescription : function() { return twitterUserDescription; },

    // Get your tweets from twitter.
    twitter : function() {
      var url = String.format("http://twitter.com/statuses/user_timeline/{0}.json", config.twitterUserName);

      $.getJSON(url + "?callback=?", function(data){
        var userInfoRendered = false;
        $.each(data, function(i, item) { 

          if (userInfoRendered == false) {
            if (config.twitterImage == true) {
              twitterImageSrc = item.user['profile_image_url'];
            }

            $.each(config['twitterUserAttributes'], function(i, name) {
              twitterUserDescription.push(item.user[name]);
            });
            
            userInfoRendered = true;
          }
          // date format = '9/1 12:00am'
          tweets.push([item.text, item.created_at]);
        });
      });
    } // eo:twitter

  };
    
}());