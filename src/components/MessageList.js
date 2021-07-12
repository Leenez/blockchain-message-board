import React from 'react';

function MessageList(props) {
  const len = props.messages.length
  const messages = props.messages.slice(0).reverse().map((message, index) => (
    <table>
      <tr>
        <th>{len - index}</th> 
        &emsp;
        <th>{message}</th>
      </tr>
    </table>
  ))
  return(
    <div>
      <br/>
      <h2>All Messages</h2>
      {messages}
    </div>
    );
}

export default MessageList;