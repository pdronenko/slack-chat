import React from 'react';
import { connect } from 'react-redux';
import Alert from 'react-bootstrap/Alert';
import * as actionCreators from '../actions';

const mapStateToProps = (state) => {
  const { socketConnectionState, chatUIState: { currentChannelId } } = state;
  const props = {
    socketConnectionState,
    currentChannelId,
  };
  return props;
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
        Disconnected :-(
        <br />
        {'You can try to '}
        <Alert.Link href="#" onClick={this.handleFetchMessages}>
          <u>reconnect</u>
        </Alert.Link>
        .
      </Alert>
    );
  }
}
