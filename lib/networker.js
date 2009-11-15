/* Adam Musial-Brihgt
 * 
 * NetWorker liobrary for presenting web servces content on one page. 
 * @require jQuery
 * @require jquery.json-2.2.js or higher
 */
(function() {
    
  networker = {
    
    twitter : function(url) {
      
      $.getJSON(url + "?callback=?", function(data){
        $.each(data, function(i, item) { 
          $("img#profile").attr("src", item.user["profile_image_url"]);
          $("#twitter ul").append("<li>"  
	                      + item.text  
	                      + "</li>");
          //return false;
        });
      });

    } // eo:twitter
    
  };
    
}());