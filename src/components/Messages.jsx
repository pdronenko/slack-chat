import React from 'react';
import { uniqueId } from 'lodash';
import { connect } from 'react-redux';
import * as actions from '../actions';
import UsernameContext from '../UsernameContext';

const mapStateToProps = ({ channels: { currentChannelId }, messages }) => {
  return { messages, currentChannelId };
};

const actionCreators = {
  fetchMessages: actions.fetchMessages,
};

@connect(mapStateToProps, actionCreators)
class Messages extends React.Component {
  static contextType = UsernameContext;

  renderMessages() {
    const { messages, currentChannelId } = this.props;
    if (messages.length < 1) {
      return 'no messages';
    }
    return messages.map(({ text, channelId, username }) => {
      return (
        <div key={uniqueId()} className="text-wrap">
          <strong>{username === this.context ? <span className="text-primary">{username}</span> : username}:</strong> {text}
        </div>
      );
    });
  }

  componentDidMount() {
    const { fetchMessages, currentChannelId } = this.props;
    fetchMessages(currentChannelId);
  }

  render() {
    return (
        <div
          id="messages"
          className="d-flex align-items-start flex-column-reverse border overflow-auto"
          style={{ height: '70vh' }}
        >
          <div className="mb-auto">
            {this.renderMessages()}
          </div>
        </div>
    );
  }
}

export default Messages;
