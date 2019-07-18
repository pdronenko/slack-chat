import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import values from 'lodash/values';
import cn from 'classnames';
import * as actionCreators from '../actions';
import { normalizeChannelName, maxChannelsCount, validateChannelName } from '../fieldValidators';

const mapStateToProps = (state) => {
  const { socketConnectionState } = state;
  const channelNames = values(state.channels.byId).map(ch => ch.name);
  return { channelNames, socketConnectionState };
};

export default @reduxForm({ form: 'newChannel' })
@connect(mapStateToProps, actionCreators)
class NewChannelForm extends React.Component {
  validate = (value) => {
    const { channelNames } = this.props;
    return validateChannelName(channelNames, value);
  }

  handleSubmit = async ({ newChannelName }) => {
    const { addChannel, reset } = this.props;
    try {
      await addChannel(newChannelName);
    } catch (e) {
      throw new SubmissionError({ _error: e.message });
    }
    reset();
  }

  render() {
    const {
      handleSubmit, submitting, pristine, error, invalid, channelNames, socketConnectionState,
    } = this.props;
    const isTooManyChannels = channelNames.length >= maxChannelsCount;
    const inputClasses = cn({
      'form-control': true,
      'is-invalid': error || invalid,
    });
    return (
      <form className="input-group" onSubmit={handleSubmit(this.handleSubmit)}>
        <Field
          name="newChannelName"
          type="text"
          normalize={normalizeChannelName}
          validate={this.validate}
          component="input"
          className={inputClasses}
          placeholder={isTooManyChannels ? 'Too many channels' : 'New channel'}
          disabled={submitting || isTooManyChannels}
        />
        <div className="input-group-append">
          <button
            className="btn btn-primary"
            type="submit"
            disabled={pristine
              || submitting
              || isTooManyChannels
              || socketConnectionState === 'disconnected'
              || invalid}
          >
            {submitting && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />}
            {!submitting && 'ADD'}
          </button>
        </div>
        <div className="invalid-feedback">
          {error || (invalid && 'This channel name already exists')}
        </div>
      </form>
    );
  }
}
