var Parse = {

  server: `http://parse.${window.CAMPUS}.hackreactor.com/chatterbox/classes/messages`,

  create: function(message, successCB, errorCB = null) {
    $.ajax({
      //message will be an object
      url: Parse.server,
      type: 'POST',
      // data: { order: '-createdAt' },
      contentType: 'application/json',
      data: JSON.stringify(message),
      success: successCB,
      error: errorCB || function(error) {
        console.error('chatterbox: Failed to create messages', error);
      }
    });
  },

  readAll: function(successCB, errorCB = null) {
    $.ajax({
      url: Parse.server,
      type: 'GET',
      data: { order: '-createdAt' },
      contentType: 'application/json',
      success: successCB,
      error: errorCB || function(error) {
        console.error('chatterbox: Failed to fetch messages', error);
      }
    });
  },

  filterRoom: function(roomname, successCB, errorCB = null) {
    $.ajax({
      url: Parse.server,
      type: 'GET',
      data: {where: {'roomname': `${roomname}`}, order: '-createdAt'},
      // data: { order: '-createdAt' },
      contentType: 'application/json',
      success: successCB,
      error: errorCB || function(error) {
        console.error('chatterbox: Failed to fetch messages', error);
      }
    });
  }

};