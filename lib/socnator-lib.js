/* Adam Musial-Brihgt
 * 
 * Socnator (Social network aggregator)
 liobrary for presenting web servces content on one page. 
 * @require jQuery
 * @require jquery.json-2.2.js or higher
 */
(function() {
  
	var config = {
		"twitterImage" : true,
		"twitterUserName" : "amusial"
	};

  socnator = {
	
    twitter : function() {
      var url = "http://twitter.com/statuses/user_timeline/" + 
				config.twitterUserName + 
				".json";
				
      $.getJSON(url + "?callback=?", function(data){
        $.each(data, function(i, item) { 
					if (config.twitterImage == true) {
          	$("img#profile").attr("src", item.user["profile_image_url"]);
        	}
					$("#twitter ul").append(
					  "<li>" +
	          socnator.convertTextToLinks(item.text) + 
	          " " +
	          item.created_at +
	          "</li>");
          //return false;
        });
      });
    }, // eo:twitter

    convertTextToLinks : function(text) {
			text = text.replace(/(#[a-zA-Z0-9:.-_]*)/g, '<i>$1</i>');
			text = text.replace(/(http[a-zA-Z0-9:.-_]*)/g, '<a target="_blank" href="$1">$1</a>');
      return text
		}
  };
    
}());