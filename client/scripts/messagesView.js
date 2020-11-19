var MessagesView = {

  $chats: $('#chats'),
  $roomnames: $('#roomselect'),

  initialize: function() {
  },

  render: function(data) {
    var $chats = $('#chats');
    $chats.html('');
    var html = '';
    for (var i = 0; i < data.results.length; i++) {

      if (Friends.friendsList.includes(data.results[i].username)) {
        data.results[i].friend = 'friend';
      } else {
        data.results[i].friend = '';
      }

      if (data.results[i].roomname !== undefined && data.results[i].roomname !== '') {
        if (App.rooms.indexOf(data.results[i].roomname) < 0) {
          App.rooms.push(data.results[i].roomname);
          MessagesView.$roomnames.append(`<option value="${data.results[i].roomname}">${data.results[i].roomname}</option>`);
        }
      }
      // html += MessageView.render(data.results[i]);
      var roomname = MessagesView.$roomnames.val();
      if (data.results[i].roomname === roomname && data.results[i].username !== undefined) {
        html += MessageView.render(data.results[i]);
      }
    }
    $chats.append(html);
  },


  renderMessage: function(message) {
    var $chats = $('#chats');
    $chats.html('');
    var html = '';

    html += MessageView.render(message);
    $chats.append(html);
  }

};