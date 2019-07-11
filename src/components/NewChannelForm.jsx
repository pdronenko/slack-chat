import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError  } from 'redux-form';
import values from 'lodash/values';
import cn from 'classnames';
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
    const inputClasses = cn({
      ['form-control']: true,
      ['is-valid']: !pristine,
    });
    return (
      <form className="form-inline mt-4" onSubmit={handleSubmit(this.handleSubmit)}>
        <div className="form-group w-100">
          <div className="input-group mb-3">
            <Field
              name="newChannelName"
              type="text"
              className={inputClasses}
              component="input"
              placeholder="New channel"
              disabled={submitting}
              maxLength="8"
            />
            <div className="input-group-append">
              <input className="btn btn-outline-primary" value="ADD" type="submit" disabled={pristine || submitting} />
              <div className="valid-feedback">
                Looks good!
              </div>
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
