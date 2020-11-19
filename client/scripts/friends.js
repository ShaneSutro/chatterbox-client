var Friends = {
  $chats: $('#chats'),
  $usernames: $('.username'),
  friendsList: [],

  initialize: function() {
    Friends.$chats.on('click', '.username', Friends.handleAddFriend);

  },


  handleAddFriend: function(event) {
    Friends.friendsList.push($(this).text().trim());
    App.fetch(MessagesView.render);
  }

};