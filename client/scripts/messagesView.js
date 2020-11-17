var MessagesView = {

  $chats: $('#chats'),

  initialize: function() {
  },

  render: function(data) {
    var html = '';
    for (var i = 0; i < data.results.length; i++) {
      console.log(data.results[i]);
      // html += MessageView.render(data.results[i]);
      if (data.results[i].username !== undefined) {
        html += MessageView.render(data.results[i]);
      }
    }
    $('#chats').append(html);
  }

};