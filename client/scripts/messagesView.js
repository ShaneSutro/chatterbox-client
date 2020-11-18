var MessagesView = {

  $chats: $('#chats'),

  initialize: function() {
  },

  render: function(data) {
    var $chats = $('#chats');
    $chats.html('');
    var html = '';
    for (var i = 0; i < data.results.length; i++) {
      // html += MessageView.render(data.results[i]);
      if (data.results[i].username !== undefined) {
        html += MessageView.render(data.results[i]);
      }
    }
    $chats.append(html);
  }

};