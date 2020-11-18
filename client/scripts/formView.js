var FormView = {

  $form: $('form'),
  $refresh: $('.refresh'),

  initialize: function() {
    FormView.$form.on('submit', FormView.handleSubmit);
    FormView.$refresh.on('click', function() {
      App.fetch(MessagesView.render);
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
    }
    var textBox = document.getElementById('message');
    message.text = textBox.value;
    message.username = App.username;

    Parse.create(message, function() {
      setTimeout(App.fetch(MessagesView.render), 500);
      // $('#chats').load(App.fetch(MessagesView.render));
    });

    textBox.value = '';
  },

  setStatus: function(active) {
    var status = active ? 'true' : null;
    FormView.$form.find('input[type=submit]').attr('disabled', status);
  }

};