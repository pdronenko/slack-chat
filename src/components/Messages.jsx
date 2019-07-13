import React from 'react';
import { connect } from 'react-redux';
import UsernameContext from '../UsernameContext';

const mapStateToProps = (state) => {
  const { chatUIState, messages, messagesFetchingState } = state;
  const props = {
    messages: messages[chatUIState.currentChannelId],
    messagesFetchingState,
  };
  return props;
};

export default @connect(mapStateToProps)
class Messages extends React.Component {
  static contextType = UsernameContext;

  renderMessages() {
    const { messages } = this.props;
    if (!messages || messages.length < 1) {
      return (
        <div className="d-flex justify-content-center text-primary w-100 h-50">
          <h1>No messages</h1>
        </div>
      );
    }
    return (
      <div className="mb-auto m-1">
        {messages.map(msg => (
          <div key={msg.id}>
            <strong className={this.context === msg.username ? 'text-primary' : null}>
              {msg.username}
            </strong>
            {`: ${msg.text}`}
          </div>
        ))}
      </div>
    );
  }

  render() {
    const { messagesFetchingState } = this.props;
    return (
      <div
        className="d-flex border p-1 flex-column-reverse align-items-start overflow-auto"
        style={{ height: '70vh' }}
      >
        {messagesFetchingState === 'requested'
          ? (
            <div className="d-flex justify-content-center text-primary w-100 h-50">
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          )
          : this.renderMessages()
        }
      </div>
    );
  }
}
