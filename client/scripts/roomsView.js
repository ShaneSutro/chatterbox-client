var RoomsView = {

  $showAddRoomInput: $('#rooms button'),
  $select: $('#rooms select'),
  $desiredRoomName: $('#roomname'),
  $addRoomButton: $('#addRoom input[type=submit]'),
  messageCount: 0,

  initialize: function() {
    RoomsView.$select.change(RoomsView.handleSelect);
    RoomsView.$showAddRoomInput.click(RoomsView.unhideRoomInput);
  },

  render: function(data, roomname) {
    var $chats = $('#chats');
    if (RoomsView.messageCount !== data.results.length && App.inBackground) {
      console.log('Updated: ' + data.results.length);
      //get the difference
      var count = data.results.length - RoomsView.messageCount;
      document.title = `(${count}) chatterbox: ${roomname}`;
      //change the title
    }
    if (!App.inBackground) {
      RoomsView.messageCount = data.results.length;
    }
    console.log('Initial: ' + RoomsView.messageCount);
    $chats.html('');
    var html = '';
    for (var i = 0; i < data.results.length; i++) {

      if (Friends.friendsList.includes(data.results[i].username)) {
        data.results[i].friend = 'friend';
      } else {
        data.results[i].friend = '';
      }

      // html += MessageView.render(data.results[i]);
      if (data.results[i].username !== undefined) {
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
    App.fetchRoom(roomname, function (data) {
      //pass data object and roomname to RoomsView.render
      RoomsView.render(data, roomname);
      var newTab = confirm(`Open ${roomname} in a new tab?`);
      if (newTab) {
        var newWindow = window.open(`file:///Users/ShaneSutro/Desktop/Galvanize/rpt26-chatterbox-client/index.html?username=anonymous&roomname=${encodeURI(roomname)}&title=chatterbox:%20${roomname}`);
      }
    });
  },

  unhideRoomInput: function() {
    $('#roomname').show();
  },

  renderRoom: function(roomname) {
    RoomsView.$select.append(`<option value="${roomname}">${roomname}</option>`);
  }

};
