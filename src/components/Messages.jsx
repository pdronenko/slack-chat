import React from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import UsernameContext from '../UsernameContext';

const mapStateToProps = (state) => {
  const {
    chatUIState, messages, messagesFetchingState, i18n: { locale },
  } = state;
  const props = {
    messages: messages[chatUIState.currentChannelId],
    messagesFetchingState,
    locale,
  };
  return props;
};

const LoadingSpinner = () => (
  <div className="d-flex justify-content-center text-secondary w-100 h-50">
    <div className="spinner-border" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);

export default @connect(mapStateToProps)
class Messages extends React.Component {
  static contextType = UsernameContext;

  renderMessages() {
    const { messages } = this.props;
    if (!messages || messages.length < 1) {
      return (
        <div className="d-flex justify-content-center text-secondary w-100 h-50">
          <h1>{I18n.t('application.noMessages')}</h1>
        </div>
      );
    }
    return (
      <div className="mb-auto m-1">
        {messages.map(msg => (
          <div key={msg.id}>
            <strong className={this.context === msg.username ? 'text-info' : 'text-dark'}>
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
    const isFetching = messagesFetchingState === 'requested';
    return (
      <div
        className="d-flex border rounded p-1 mt-3 flex-column-reverse align-items-start overflow-auto"
        style={{ height: '70vh' }}
      >
        {isFetching ? <LoadingSpinner /> : this.renderMessages()}
      </div>
    );
  }
}
