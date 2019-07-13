import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import cn from 'classnames';
import * as actions from '../actions';
import UsernameContext from '../UsernameContext';
import { normalizeMessage } from '../fieldValidators';

const mapStateToProps = (state) => {
  const {
    chatUIState: { currentChannelId }, socketConnectionState,
  } = state;
  return { currentChannelId, socketConnectionState };
};

const actionCreators = {
  addMessage: actions.addMessage,
};

@connect(mapStateToProps, actionCreators)
class MessageForm extends React.Component {
  static contextType = UsernameContext;

  handleSubmitMessage = async (values) => {
    const { addMessage, reset, currentChannelId } = this.props;
    const username = this.context;
    const message = {
      ...values, channelId: currentChannelId, username,
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
      handleSubmit, submitting, pristine, error, socketConnectionState,
    } = this.props;
    const inputClasses = cn({
      'form-control': true,
      'is-invalid': error,
    });

    return (
      <form onSubmit={handleSubmit(this.handleSubmitMessage)}>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <button
              className="btn btn-primary"
              type="submit"
              value="SEND"
              disabled={pristine
                || submitting
                || socketConnectionState === 'disconnected'}
            >
              {submitting && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />}
              {!submitting && 'SEND'}
            </button>
          </div>
          <Field
            name="text"
            normalize={normalizeMessage}
            component={({ input, disabled }) => (
              <input
                {...input}
                type="text"
                className={inputClasses}
                placeholder="Message"
                disabled={disabled}
                autoFocus
              />
            )}
            disabled={submitting}
          />
          <div className="invalid-feedback">
            {error}
          </div>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'newMessage',
})(MessageForm);
