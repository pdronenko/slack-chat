import React from 'react';
import Channels from './Channels';
import Messages from './Messages';
import MessageForm from './MessageForm';

const Chat = () => (
  <div className="row justify-content-start">
    <Channels />
    <Messages>
      <MessageForm />
    </Messages>
  </div>
);

export default Chat;
