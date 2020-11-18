var RoomsView = {

  $showAddRoomInput: $('#rooms button'),
  $select: $('#rooms select'),
  $desiredRoomName: $('#roomname'),
  $addRoomButton: $('#addRoom input[type=submit]'),

  initialize: function() {
    RoomsView.$select.change(RoomsView.handleSelect);
    RoomsView.$showAddRoomInput.click(RoomsView.unhideRoomInput);
  },

  render: function(data, roomname) {
    var $chats = $('#chats');
    $chats.html('');
    var html = '';
    for (var i = 0; i < data.results.length; i++) {
      // html += MessageView.render(data.results[i]);
      if (data.results[i].roomname === roomname && data.results[i].username !== undefined) {
        html += MessageView.render(data.results[i]);
      }
    }
    $chats.append(html);
  },

  handleSelect: function(event) {
    //Get roomName from select value
    var roomname = $(this).val();
    console.log(roomname);
    //get data from server
    App.fetch(function (data) {
      //pass data object and roomname to RoomsView.render
      RoomsView.render(data, roomname);
    });


  },

  unhideRoomInput: function() {
    $('#roomname').show();
  },

};
