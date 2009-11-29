/* Adam Musial-Brihgt
 * 
 * Socnator (SOCial Network aggregaTOR)
 * Liobrary for network web services access.
 *
 * @require jQuery, ExtJS
 */
(function() {

  var config = {
    "userName" : "Adam Musial-Bright",
    "twitterImage" : true,
    "twitterUserName" : "amusial",
    "twitterUserAttributes" : ["name", "description", "location"],
    "githubUserName" : "musial-bright"
  };

  // tweets = [["Tweet1"],["Tweet2"]]
  var twitter = {
    "tweets" : Array(),
    "userImage" : "",
    "userDescription" : Array()
  }
  //var twitterUserDescription = new Array();
  
  var githubData = {
    "projects" : Array()
  }

  socnator = {

    getTweets : function() { return twitter["tweets"]; },
    
    getUserName : function() { return config.userName; },
    
    getTwitterImage : function() { return twitter["userImage"]; },
    
    getTwitterUserDescription : function() { return twitter["userDescription"]; },
    
    getGithubProjects : function() { return githubData["projects"]; },

    // Get your tweets from twitter.
    twitter : function() {
      var url = String.format("http://twitter.com/statuses/user_timeline/{0}.json", config.twitterUserName);

      $.getJSON(url + "?callback=?", function(data){
        var userInfoRendered = false;
        $.each(data, function(i, item) { 

          if (userInfoRendered == false) {
            if (config.twitterImage == true) {
              twitter["userImage"] = item.user['profile_image_url'];
            }

            $.each(config['twitterUserAttributes'], function(i, name) {
              twitter["userDescription"].push(item.user[name]);
            });
            
            userInfoRendered = true;
          }
          twitter["tweets"].push( [item.text, item.created_at] );
        });
      });
    }, // eo:twitter

    github : function() {
      var url = String.format("http://github.com/api/v1/json/{0}", config.githubUserName);
      
      $.getJSON(url + "?callback=?", function(data){
        var userInfoRendered = false;
        $.each(data, function(i, item) { 
          $.each(item.repositories, function(i, item) { 
            githubData["projects"].push( 
              [
                item.name, 
                String.format('{0}<br/>{1}', item.description, item.url, item.url)
              ] 
            );
          });
        });
      });
    }

  };
    
}());