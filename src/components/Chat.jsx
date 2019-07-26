import React from 'react';
import UserProfile from './UserProfile';
import ConnectStatus from './ConnectStatus';
import Channels from './Channels';
import Messages from './Messages';
import MessageForm from './MessageForm';
import NewChannelForm from './NewChannelForm';
import ChannelEditModals from './ChannelEditModals';

const Chat = () => (
  <div className="row">
    <div id="sidebar" className="col-md-4 col-lg-3 bg-light pt-3 rounded">
      <UserProfile />
      <ConnectStatus />
      <Channels />
      <hr />
      <NewChannelForm />
      <ChannelEditModals />
    </div>
    <div id="body" className="col bg-light rounded">
      <Messages />
      <MessageForm />
    </div>
  </div>
);

export default Chat;
