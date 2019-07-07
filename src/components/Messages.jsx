import React from 'react';
import { uniqueId } from 'lodash';
import { connect } from 'react-redux';
import * as actions from '../actions';

const mapStateToProps = ({ channels: { currentChannelId }, messages }) => {
  return { messages: messages[currentChannelId] };
};

class Messages extends React.Component {
  renderMessages() {
    const { messages } = this.props;
    if (!messages) {
      return 'no messages';
    }
    return messages.map(({ text, channelId, username }) => {
      return (
        <div key={uniqueId()} className="text-wrap">
          <strong>{username}:</strong> {text}
        </div>
      );
    });
  }
  render() {
    return (
      <div id="messages-container" className="col-8">
        <div id="messages" className="d-flex align-items-start flex-column-reverse border overflow-auto" style={{ height: '70vh' }}>
          <div className="mb-auto">
            {this.renderMessages()}
          </div>
        </div>
        <div id="message-form">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Messages);
