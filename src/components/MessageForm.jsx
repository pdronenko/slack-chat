import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import cn from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { I18n } from 'react-redux-i18n';
import * as actionCreators from '../actions';
import UsernameContext from '../UsernameContext';
import { normalizeMessage } from '../fieldValidators';

const mapStateToProps = (state) => {
  const {
    chatUIState: { currentChannelId }, i18n: { locale }, socketConnectionState,
  } = state;
  return { currentChannelId, socketConnectionState, locale };
};

export default @reduxForm({ form: 'newMessage' })
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
          <Field
            name="text"
            normalize={normalizeMessage}
            component={({ input, disabled }) => (
              <input
                {...input}
                type="text"
                className={inputClasses}
                placeholder={I18n.t('application.message')}
                disabled={disabled}
                autoFocus
              />
            )}
            disabled={submitting}
          />
          <div className="input-group-append">
            <button
              className="btn btn-secondary rounded-right"
              type="submit"
              disabled={pristine
                || submitting
                || socketConnectionState === 'disconnected'}
            >
              {submitting && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />}
              {!submitting && <FontAwesomeIcon icon={faPaperPlane} size="lg" />}
            </button>
          </div>
          <div className="invalid-feedback">
            {error}
          </div>
        </div>
      </form>
    );
  }
}
