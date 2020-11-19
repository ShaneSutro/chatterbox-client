var MessageView = {

  render: _.template(`
      <div class="chat <%-obj.friend%>">
        <div class="username">
          <%- obj.username %>
        </div>
        <div class="roomname">
          <%- obj.roomname %>
        </div>
        <div class="text">
          <%- obj.text %>
        </div>
      </div>
    `)

  // render: _.template('Hello <%= username %>')

};