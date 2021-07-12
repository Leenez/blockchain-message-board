import React from 'react';

function MessageForm(props) {

    return (
      <div>
        <h2>Send Message To Message Board</h2>
      <form onSubmit={event => {
          event.preventDefault();
          const msg = document.getElementById("msg").value;
          props.sendMessage(msg);
      }}>
          <input id="msg" type="text" placeholder="Message"/>
          <button type="submit">Send Message</button>
      </form>
      </div>
    );
}

export default MessageForm;