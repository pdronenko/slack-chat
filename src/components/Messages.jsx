import React from 'react';
import uniqueId from 'lodash/uniqueId';
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
export default class Messages extends React.Component {
  static contextType = UsernameContext;

  handleFetchMessages = () => {
    const { fetchMessages, currentChannelId } = this.props;
    fetchMessages(currentChannelId);
  }

  renderRequest() {
    return (
      <div className="d-flex justify-content-center text-primary w-100 h-50">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  renderFailure() {
    const { fetchMessages } = this.props;
    return (
      <div className="d-flex align-items-center flex-column text-danger w-100 h-50">
        <div>
          <h1>Failed to load messages</h1>
        </div>
        <div>
          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={this.handleFetchMessages}
          >
            RECONNECT
          </button>
        </div>
      </div>
    );
  }

  renderSuccess() {
    const { messages, currentChannelId } = this.props;
    if (messages.length < 1) {
      return (
        <div className="d-flex justify-content-center text-primary w-100 h-50">
          <h1>No messages</h1>
        </div>
      );
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
  }

  renderMessages() {
    const { fetchMessageStatus } = this.props;
    switch (fetchMessageStatus) {
      case 'request':
        return this.renderRequest();
      case 'failure':
        return this.renderFailure();
      case 'success':
        return this.renderSuccess();
      default:
        return 'wrong fetch message status';
    }
  }

  componentDidMount() {
    this.handleFetchMessages();
  }
  componentDidUpdate(prevProps) {
    const { currentChannelId } = this.props;
    if (prevProps.currentChannelId !== currentChannelId) {
      this.handleFetchMessages();
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
