import React from 'react';
import UserProfile from './UserProfile';
import Channels from './Channels';
import Messages from './Messages';
import MessageForm from './MessageForm';

const Chat = () => (
  <div className="row justify-content-start">
    <div className="col-2">
      <UserProfile />
      <Channels />
    </div>
    <Messages>
      <MessageForm />
    </Messages>
  </div>
);

export default Chat;
