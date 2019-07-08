import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError  } from 'redux-form';
import * as actions from '../actions';

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
  handleSubmit = async (values) => {
    const { addMessage, reset, currentChannelId, username } = this.props;
    const message = {
      ...values,
      channelId: currentChannelId,
      username,
    };
    try {
      await addMessage({ message });
    } catch (e) {
      throw new SubmissionError({ _error: e.message });
    }
    reset();
  }

  render() {
    const { handleSubmit, submitting, pristine, error } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleSubmit)}>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <input className="btn btn-outline-primary" type="submit" value="SEND" disabled={pristine || submitting} />
          </div>
          <Field
            name="text"
            required
            component="input"
            type="text"
            className="form-control"
          />
        </div>
        {error && <div className="ml-3">{error}</div>}
      </form>
    );
  }
}

const ConnectedNewMessageForm = connect(mapStateToProps, actionCreators)(MessageForm);
export default reduxForm({
  form: 'newMessage',
})(ConnectedNewMessageForm);
