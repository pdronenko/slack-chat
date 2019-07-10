import React from 'react';
import { uniqueId } from 'lodash';
import { connect } from 'react-redux';
import * as actions from '../actions';
import UsernameContext from '../UsernameContext';

const mapStateToProps = ({ chatUIState: { currentChannelId, fetchMessageStatus }, messages }) => {
  return { messages, currentChannelId, fetchMessageStatus };
};

const actionCreators = {
  fetchMessages: actions.fetchMessages,
};

@connect(mapStateToProps, actionCreators)
class Messages extends React.Component {
  static contextType = UsernameContext;

  renderMessages() {
    const { messages, currentChannelId, fetchMessageStatus } = this.props;
    switch (fetchMessageStatus) {
      case 'request': {
        return (
          <div className="d-flex justify-content-center text-primary w-100 h-50">
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        );
      } case 'failure': {
        return 'fail';
      } case 'success': {
        if (messages.length < 1) {
          return 'no messages';
        }
        return (
          <div className="mb-auto m-1">
          {messages.map(({ text, channelId, username }) => (
            <div key={uniqueId()} className="text-wrap">
              <strong>{username === this.context ? <span className="text-primary">{username}</span> : username}:</strong> {text}
            </div>
            )
          )}
          </div>
        );
      } default:
        return 'nooo';
    }
  }

  componentDidMount() {
    const { fetchMessages, currentChannelId } = this.props;
    fetchMessages(currentChannelId);
  }
  componentDidUpdate(prevProps) {
    const { currentChannelId, fetchMessages } = this.props;
    if (prevProps.currentChannelId !== currentChannelId) {
      fetchMessages(currentChannelId);
    }
  }

  render() {
    return (
      <div
        id="messages"
        className="d-flex align-items-start flex-column-reverse border overflow-auto"
        style={{ height: '70vh' }}
      >
        {this.renderMessages()}
      </div>
    );
  }
}

export default Messages;
