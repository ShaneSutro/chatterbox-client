var App = {

  $spinner: $('.spinner img'),

  username: 'Mr. Robot',
  rooms: [],

  initialize: function() {
    App.username = window.location.search.substr(10);

    FormView.initialize();
    RoomsView.initialize();
    MessagesView.initialize();

    // Fetch initial batch of messages
    App.startSpinner();
    App.fetch(App.stopSpinner);
    App.fetch(MessagesView.render);
  },

  fetch: function(callback = ()=>{}) {
    Parse.readAll((data) => {
      // examine the response from the server request:
      console.log(data);

      callback(data);
    });
  },

  startSpinner: function() {
    App.$spinner.show();
    FormView.setStatus(true);
  },

  stopSpinner: function(data) {
    App.$spinner.fadeOut('fast');
    FormView.setStatus(false);
  }
};

