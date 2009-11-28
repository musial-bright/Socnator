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

  socnator = {

	  getTweetsAsArray : function() { return tweets; },
    
    getUserName : function() { return config.userName; },
	
	  // Get your tweets from twitter.
    twitter : function() {
      var url = "http://twitter.com/statuses/user_timeline/" + 
        config.twitterUserName + 
        ".json";

      $.getJSON(url + "?callback=?", function(data){
        var userInfoRendered = false;
        $.each(data, function(i, item) { 

          if (userInfoRendered == false) {
            if (config.twitterImage == true) {
            	$("img#twitter_profile").attr("src", item.user['profile_image_url']);
          	}
          	
            $.each(config['twitterUserAttributes'], function(i, name) {
              $("#twitter_description").append(item.user[name] + "<br/>");
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