import React from 'react';
import UserProfile from './UserProfile';
import Channels from './Channels';
import Messages from './Messages';
import MessageForm from './MessageForm';
import NewChannelForm from './NewChannelForm';
import ChannelModals from './ChannelModals';

const Chat = () => (
  <div className="row justify-content-start">
    <div id="sidebar" className="col-3">
      <UserProfile />
      <Channels />
      <NewChannelForm />
      <ChannelModals />
    </div>
    <div id="body" className="col-8">
      <Messages />
      <MessageForm />
    </div>
  </div>
);

export default Chat;
