/* Adam Musial-Brihgt
 * 
 * Socnator twitter view
 *
 * @require jQuery, ExtJS
 */
Ext.onReady(function(){

    // NOTE: This is an example showing simple state management. During development,
    // it is generally best to disable state management as dynamically-generated ids
    // can change across page loads, leading to unpredictable results.  The developer
    // should ensure that stable state ids are set for stateful components in real apps.    
    //Ext.state.Manager.setProvider(new Ext.state.CookieProvider());


    // create the data store
    var store = new Ext.data.ArrayStore({
        fields: [
           {
             name: 'tweet',
             type: 'string'
           },
           {
             name: 'date',
             type: 'date',
             //created_at = "Mon Nov 09 21:25:56 +0000 2009"
             dateFormat: 'D M d G:i:s O Y'
            }
        ]
    });

    // manually load local data
    store.loadData(socnator.getTweets());

    function renderText(text){
      text = text.replace(/(#[a-zA-Z0-9:.-_]*)/g, '<i>$1</i>');
      text = text.replace(/(http[a-zA-Z0-9:.-_]*)/g, '<a target="_blank" href="$1">$1</a>');
      text = String.format('<p style="white-space: normal">{0}</p>', text);
      return text;
    }

    // create the Grid
    var grid = new Ext.grid.GridPanel({
      store: store,
      stripeRows: true,
      autoExpandColumn: 'tweet',
      width: 400,
      height: 350,
      //title: socnator.getUserName(),
      title: '<img id="twitter_profile_img" /><div id="twitter_description"></div><div style="clear: both;"></div>',
      // config options for stateful behavior
      stateful: true,
      stateId: 'grid',

      columns: [
          {
            id:'tweet',
            header: 'Tweets', 
            width: 300, 
            sortable: true,
            renderer: renderText,
            dataIndex: 'tweet'
          },
          {
            header: 'Date', 
            width: 100, 
            sortable: true, 
            renderer: Ext.util.Format.dateRenderer('M. d, Y'), 
            dataIndex: 'date'
          }
      ]

    });
    
    
    // render the grid to the specified div in the page
    grid.render('twitter');
    
    // render the user profile
    $("#twitter_profile_img").attr("src", socnator.getTwitterImage());
    
    $.each(socnator.getTwitterUserDescription(), function(i, value) {
      $("#twitter_description").append(value + "<br/>");
    });
});