import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError  } from 'redux-form';
import Modal from 'react-bootstrap/Modal';
import * as actions from '../actions';

const mapStateToProps = ({ chatUIState: { renameModalState, channelToRename } }) => {
  return { renameModalState, channelToRename };
};

const actionCreators = {
  renameChannel: actions.renameChannel,
  closeModal: actions.closeModal,
};

@connect(mapStateToProps, actionCreators)
class RenameChannelModal extends React.Component {
  handleRenameChannel = async ({ newChannelName }) => {
    const { renameChannel, channelToRename, reset } = this.props;
    try {
      await renameChannel(channelToRename, newChannelName);
    } catch (e) {
      throw new SubmissionError({ _error: e.message });
    }
    reset();
  }

  handleCloseModal = () => {
    const { closeModal } = this.props;
    closeModal();
  }

  render() {
    const {
      renameModalState,
      submitting,
      channelToRename,
      handleSubmit,
      pristine,
    } = this.props;
    return (
      <Modal show={renameModalState} onHide={this.handleCloseModal} dialogClassName="modal-90w" centered>
        <Modal.Body>
        <form className="form-row" onSubmit={handleSubmit(this.handleRenameChannel)}>
          <div className="col">
            <Field
              name="newChannelName"
              required
              component="input"
              type="text"
              className="form-control"
              disabled={submitting}
              autoFocus
              placeholder="New channel name"
            />
          </div>
          <button
            className="btn btn-outline-primary"
            type="submit"
            value="SEND"
            disabled={pristine || submitting}>
            {submitting && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
            {!submitting && 'RENAME'}
          </button>
        </form>
        </Modal.Body>
      </Modal>
    );
  }
}

export default reduxForm({
  form: 'renameChannel',
})(RenameChannelModal);
