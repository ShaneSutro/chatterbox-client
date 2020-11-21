var MessagesView = {

  $chats: $('#chats'),
  $roomnames: $('#roomselect'),

  initialize: function() {
    const urlParams = new URLSearchParams(window.location.search);
    var title = urlParams.get('title');
    window.document.title = title || 'chatterbox';
  },

  render: function(data) {
    var $chats = $('#chats');
    $chats.html('');
    var html = '';
    // debugger;
    const urlParams = new URLSearchParams(window.location.search);
    var roomname = urlParams.get('roomname');
    for (var i = 0; i < data.results.length; i++) {

      if (Friends.friendsList.includes(data.results[i].username)) {
        data.results[i].friend = 'friend';
      } else {
        data.results[i].friend = '';
      }

      if (data.results[i].roomname !== undefined && data.results[i].roomname !== '') {
        if (App.rooms.indexOf(data.results[i].roomname) < 0) {
          App.rooms.push(data.results[i].roomname);
          var escapeHtml = function (htmlStr) {
            return htmlStr.replace(/&/g, '\\&').replace(/</g, '\\<').replace(/>/g, '\\>').replace(/"/g, '\\"');
          };
          MessagesView.$roomnames.append(`<option value="${data.results[i].roomname}">${escapeHtml(data.results[i].roomname)}</option>`);
        }
      }

      if (roomname !== null) {
        if (data.results[i].roomname === roomname && data.results[i].username !== undefined) {
          html += MessageView.render(data.results[i]);
        }
      } else if (data.results[i].username !== undefined) {
        html += MessageView.render(data.results[i]);
      }

    }
    if (roomname !== null) {
      MessagesView.$roomnames.val(roomname);
    }
    $chats.append(html);
    if (!App.autoRefresh) {
      MessagesView.autoRefresh(data, roomname);
    }
  },

  autoRefresh: function(data, roomname) {
    App.autoRefresh = setInterval(function() {
      App.fetchRoom(roomname, function(data) {
        RoomsView.render(data, roomname);
      });
    }, 10000);
  },


  renderMessage: function(message) {
    var $chats = $('#chats');
    $chats.html('');
    var html = '';

    html += MessageView.render(message);
    $chats.append(html);
  }

};