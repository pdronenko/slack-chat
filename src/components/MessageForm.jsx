import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError  } from 'redux-form';
import * as actions from '../actions';
import UsernameContext from '../UsernameContext';

const mapStateToProps = ({ chatUIState: {
    currentChannelId, fetchMessageStatus,
  } }) => ({ currentChannelId, fetchMessageStatus });

const actionCreators = {
  addMessage: actions.addMessage,
};

@connect(mapStateToProps, actionCreators)
class MessageForm extends React.Component {
  static contextType = UsernameContext;

  handleSubmit = async (values) => {
    const { addMessage, reset, currentChannelId } = this.props;
    const username = this.context;
    const message = {
      ...values,
      channelId: currentChannelId,
      username,
    };
    try {
      await addMessage(message);
    } catch (e) {
      throw new SubmissionError({ _error: e.message });
    }
    reset();
  }

  render() {
    const {
      handleSubmit, submitting, pristine, error, fetchMessageStatus,
    } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleSubmit)}>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <button
              className="btn btn-outline-primary"
              type="submit"
              value="SEND"
              disabled={pristine || submitting || fetchMessageStatus !== 'success'}>
              {submitting && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
              {!submitting && 'SEND'}
            </button>
          </div>
          <Field
            name="text"
            required
            component="input"
            type="text"
            className="form-control"
            disabled={submitting}
            autoFocus
          />
        </div>
        {error && <div className="ml-3">{error}</div>}
      </form>
    );
  }
}

export default reduxForm({
  form: 'newMessage',
})(MessageForm);
