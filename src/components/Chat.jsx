import React from 'react';
import Channels from './Channels';
import Messages from './Messages';
import MessageForm from './MessageForm';

export default class Chat extends React.Component {
  render() {
    const { channels, messages, currentChannelId } = this.props;
    return (
      <div className="row justify-content-start">
        <Channels channels={channels} />
        <Messages messages={messages}>
          <MessageForm />
        </Messages>
      </div>
    );
  }
}
