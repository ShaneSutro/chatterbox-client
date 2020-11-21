var App = {

  $spinner: $('.spinner img'),

  username: 'Mr. Robot',
  rooms: [],
  inBackround: false,

  initialize: function() {
    const urlParams = new URLSearchParams(window.location.search);
    var username = urlParams.get('username') || App.username;
    // App.username = window.location.search.substr(10);

    document.addEventListener('visibilitychange', function() {
      if (document.visibilityState === 'visible') {
        console.log('Visible');
        App.inBackround = false;
      } else {
        console.log('Invisible');
        App.inBackround = true;
        //freeze the current count
        //update the tab title to show unread messages
      }
    });

    FormView.initialize();
    RoomsView.initialize();
    MessagesView.initialize();

    // Fetch initial batch of messages
    App.startSpinner();
    App.fetch(App.stopSpinner);
    App.fetch(MessagesView.render);
    Friends.initialize();
  },

  fetch: function(callback = ()=>{}) {
    Parse.readAll((data) => {
      // examine the response from the server request:
      console.log(data);

      callback(data);
    });
  },

  fetchRoom: function(roomname, callback = ()=>{}) {
    Parse.filterRoom(roomname, (data) => {
      console.log('Filtered:', data);

      callback(data, roomname);
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

