import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../actions';
import routes from '../../server/routes';

const mapStateToProps = (state) => {
  const {
    channels: { currentChannelId },
    userData: { username },
  } = state;
  return { currentChannelId, username };
};

const actionCreators = {
  addMessage: actions.addMessage,
};

class MessageForm extends React.Component {
  handleSubmit = (values) => {
    const { addMessage, reset, currentChannelId, username } = this.props;
    const message = {
      ...values,
      channelId: currentChannelId,
      username,
    };
    console.log(routes())
    addMessage({ message });
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
            name="text"
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
