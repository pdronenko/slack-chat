import React from 'react';
import { connect } from 'react-redux';
import Alert from 'react-bootstrap/Alert';
import * as actions from '../actions';

const mapStateToProps = ({ chatConnectionState, chatUIState }) => {
  const { currentChannelId } = chatUIState;
  const props = {
    chatConnectionState,
    currentChannelId,
  }
  return props;
};

const actionCreators = {
  fetchMessages: actions.fetchMessages,
};

@connect(mapStateToProps, actionCreators)
export default class ConnectStatus extends React.Component {
  handleFetchMessages = (e) => {
    e.preventDefault();
    const { fetchMessages, currentChannelId } = this.props;
    fetchMessages(currentChannelId);
  }

  render() {
    const { chatConnectionState } = this.props;
    return (
      <Alert show={chatConnectionState === 'disconnected'} variant="danger">
        Disconnected :-(
        <br />
        You can try to{' '}
        <Alert.Link href="#" onClick={this.handleFetchMessages}>
          <u>reconnect</u>
        </Alert.Link>.
      </Alert>
    );
  }
}