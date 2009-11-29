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
             name: 'project',
             type: 'string'
           },
           {
             name: 'description',
             type: 'string',
            }
        ]
    });

    // manually load local data
    store.loadData(socnator.getGithubProjects());

    function renderText(text){
      text = text.replace(/(http[a-zA-Z0-9:.-_]*)/g, '<a target="_blank" href="$1">$1</a>');
      text = String.format('<p style="white-space: normal;">{0}</p>', text);
      return text;
    }

    // create the Grid
    var grid = new Ext.grid.GridPanel({
      store: store,
      stripeRows: true,
      autoExpandColumn: 'project',
      width: 400,
      height: 300,
      title: 'My projects on github',
      //title: '<img id="twitter_profile_img" /><div id="twitter_description"></div><div style="clear: both;"></div>',
      // config options for stateful behavior
      stateful: true,
      stateId: 'grid',

      columns: [
          {
            id:'project',
            header: 'Project', 
            width: 100, 
            sortable: true,
            dataIndex: 'project'
          },
          {
            header: 'Description', 
            width: 300, 
            sortable: true,
            renderer: renderText, 
            dataIndex: 'description'
          }
      ]

    });
    
    
    // render the grid to the specified div in the page
    grid.render('github');
    
    
});