import React from 'react';
import { connect } from 'react-redux';
import Alert from 'react-bootstrap/Alert';
import { I18n } from 'react-redux-i18n';
import * as actionCreators from '../actions';

const mapStateToProps = (state) => {
  const {
    socketConnectionState,
    chatUIState: { currentChannelId },
    i18n: { locale },
  } = state;
  return {
    socketConnectionState,
    currentChannelId,
    locale,
  };
};

export default @connect(mapStateToProps, actionCreators)
class ConnectStatus extends React.Component {
  handleFetchMessages = (e) => {
    e.preventDefault();
    const { fetchMessages, currentChannelId } = this.props;
    fetchMessages(currentChannelId);
  }

  render() {
    const { socketConnectionState } = this.props;
    return (
      <Alert show={socketConnectionState === 'disconnected'} variant="danger">
        {I18n.t('application.disconnected')}
        <br />
        {I18n.t('application.try_to')}
        <Alert.Link href="#" onClick={this.handleFetchMessages}>
          <u>{I18n.t('application.reconnect')}</u>
        </Alert.Link>
        .
      </Alert>
    );
  }
}
