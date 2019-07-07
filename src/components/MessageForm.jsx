import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { uniqueId } from 'lodash';
import * as actions from '../actions';

const mapStateToProps = (state) => {
  const { channels: { currentChannelId }, username } = state;
  return { currentChannelId, username };
};

const actionCreators = {
  addMessage: actions.addMessage,
};

class MessageForm extends React.Component {
  handleSubmit = (values) => {
    const { addMessage, reset, currentChannelId, username } = this.props;
    const message = { chId:currentChannelId, msgId: uniqueId('msg_'), username };
    addMessage(message);
    reset();
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleSubmit)}>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <input className="btn btn-outline-primary" type="submit" value="SEND" />
          </div>
          <Field
            name="message"
            required
            component="input"
            type="text"
            className="form-control"
          />
        </div>
      </form>
    );
  }
}

const ConnectedNewMessageForm = connect(mapStateToProps, actionCreators)(MessageForm);
export default reduxForm({
  form: 'newMessage',
})(ConnectedNewMessageForm);
