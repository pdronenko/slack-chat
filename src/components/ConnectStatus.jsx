import React from 'react';
import { connect } from 'react-redux';
import Alert from 'react-bootstrap/Alert';
import * as actions from '../actions';

const mapStateToProps = ({ channels, chatUIState: { currentChannelId, fetchMessageStatus } }) => {
  return { channels, currentChannelId, fetchMessageStatus };
};

const actionCreators = {
//  changeChannel: actions.changeChannel,
};

@connect(mapStateToProps, actionCreators)
export default class ConnectStatus extends React.Component {
  render() {
    return (
      <Alert  variant="success">
        This is a  alert with{' '}
        <Alert.Link href="#">an example link</Alert.Link>. Give it a click if you
        like.
      </Alert>
    );
  }
}