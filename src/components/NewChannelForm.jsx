import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import values from 'lodash/values';
import * as actions from '../actions';
import ChannelNameInput from './ChannelNameInput';
import { normalizeChannelName, maxChannelsCount } from '../fieldValidators';

const mapStateToProps = ({ channels }) => {
  const channelNames = values(channels.byId).map(ch => ch.name);
  return { channelNames };
};

const actionCreators = {
  addChannel: actions.addChannel,
};

@connect(mapStateToProps, actionCreators)
class NewChannelForm extends React.Component {
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
      handleSubmit, submitting, pristine, invalid, error, channelNames,
    } = this.props;
    const isTooManyChannels = channelNames.length >= maxChannelsCount;
    return (
      <form className="input-group" onSubmit={handleSubmit(this.handleSubmit)}>
        <Field
          name="newChannelName"
          normalize={normalizeChannelName}
          component={ChannelNameInput}
          label={isTooManyChannels ? "Too many channels" : "New channel"}
          disabled={submitting || isTooManyChannels}
        >
          <div className="input-group-append">
            <input
              className="btn btn-primary"
              type="submit"
              value="ADD"
              disabled={pristine || submitting || invalid || isTooManyChannels}
            />
          </div>
        </Field>
      </form>
    );
  }
}

export default reduxForm({
  form: 'newChannel',
})(NewChannelForm);
