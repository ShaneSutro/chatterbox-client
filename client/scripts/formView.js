var FormView = {

  $form: $('form'),
  $refresh: $('.refresh'),

  initialize: function() {
    FormView.$form.on('submit', FormView.handleSubmit);
    FormView.$refresh.on('click', function() {
      var roomname = $('#roomselect').val();
      App.fetchRoom(roomname, function(data) {
        RoomsView.render(data, roomname);
      });
    });
  },

  handleSubmit: function(event) {
  // Stop the browser from submitting the form
    event.preventDefault();

    var message = {};
    //create an object to send
    //get the contents of the textbox
    console.warn($('#roomname').val());
    if ($('#roomname').val() === '') {
      message.roomname = $('#roomselect').val();
    } else {
      message.roomname = $('#roomname').val();
      //select the roomname
      //re-render
    }
    var textBox = document.getElementById('message');
    message.text = textBox.value;
    message.username = App.username;

    Parse.create(message, function() {
      App.fetchRoom(message.roomname, function(data) {
        RoomsView.render(data, message.roomname);
      });
    });

    // Parse.create(message, function() {
    //   setTimeout(function() {
    //     App.fetchRoom(message.roomname, function(data) {
    //       RoomsView.render(data, message.roomname);
    //     });
    //   }, 500);
    // $('#chats').load(App.fetch(MessagesView.render));
    // });
    //console.log($('#roomselect').val());
    textBox.value = '';
    $('#roomname').val('');
  },

  setStatus: function(active) {
    var status = active ? 'true' : null;
    FormView.$form.find('input[type=submit]').attr('disabled', status);
  }

};