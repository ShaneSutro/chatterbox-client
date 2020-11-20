var Friends = {
  $chats: $('#chats'),
  $usernames: $('.username'),
  friendsList: [],

  initialize: function() {
    Friends.$chats.on('click', '.username', Friends.toggleStatus);
  },


  toggleStatus: function(event) {
    if (!Friends.friendsList.includes($(this).text().trim())) {
      Friends.friendsList.push($(this).text().trim());
      App.fetch(MessagesView.render);
    }
  }

};