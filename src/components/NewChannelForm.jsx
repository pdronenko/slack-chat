import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError  } from 'redux-form';
import { values } from 'lodash';
import * as actions from '../actions';

const mapStateToProps = ({ channels }) => {
  const channelNames = values(channels.byId).map(ch => ch.name);
  return { channelNames };
};

const actionCreators = {
  addChannel: actions.addChannel,
};

const double = channelName => channelName === 'x' ? 'Double' : undefined;

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
    const { handleSubmit, submitting, pristine, error, channelNames } = this.props;
    return (
      <form className="form-inline mt-4" onSubmit={handleSubmit(this.handleSubmit)}>
        <div className="form-group w-100">
          <div className="input-group mb-3">
            <Field
              name="newChannelName"
              type="text"
              className="form-control"
              component="input"
              placeholder="New channel"
              disabled={submitting}
              maxLength="8"
              validate={double}
            />
            <div className="input-group-append">
              <input className="btn btn-outline-primary" value="+" type="submit" disabled={pristine || submitting} />
            </div>
          </div>
        </div>
        {error && <div className="ml-3">{error}</div>}
      </form>
    );
  }
}

export default reduxForm({
  form: 'newChannel',
})(NewChannelForm);
