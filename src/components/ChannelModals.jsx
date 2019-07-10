import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import * as actions from '../actions';

const mapStateToProps = ({
  chatUIState: {
    channelModalState,
    removeModalState,
    channelToEdit
  },
}) => {
  return { channelModalState, removeModalState, channelToEdit };
};

const actionCreators = {
  renameChannel: actions.renameChannel,
  removeChannel: actions.removeChannel,
  closeModal: actions.closeModal,
  showRemoveModal: actions.showRemoveModal,
};

@connect(mapStateToProps, actionCreators)
class RenameChannelModal extends React.Component {
  handleRenameChannel = async ({ newChannelName }) => {
    const { renameChannel, reset, channelToEdit } = this.props;
    try {
      await renameChannel(channelToEdit, newChannelName);
    } catch (e) {
      throw new SubmissionError({ _error: e.message });
    }
    reset();
  }

  handleRemoveChannel = async () => {
    const { removeChannel, channelToEdit } = this.props;
    try {
      await removeChannel(channelToEdit);
    } catch (e) {
      throw new Error(e);
    }
  }

  handleCloseModal = () => {
    const { closeModal } = this.props;
    closeModal();
  }

  handleShowRemoveModal = () => {
    const { showRemoveModal } = this.props;
    this.handleCloseModal();
    showRemoveModal();
  }

  renderEditModal() {

  }

  render() {
    const {
      channelModalState,
      removeModalState,
      submitting,
      handleSubmit,
      pristine,
    } = this.props;
    return (
      <div id="modals">
        <Modal show={channelModalState} onHide={this.handleCloseModal} size="sm" centered>
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
          <hr />
          <Button
            variant="outline-danger btn-sm btn-block mt-2"
            onClick={this.handleShowRemoveModal}
          >
            REMOVE CHANNEL
          </Button>
          </Modal.Body>
        </Modal>
        <Modal show={removeModalState} onHide={this.handleCloseModal} size="sm" centered>
          <Modal.Header>
            <h3>Are you sure?</h3>
          </Modal.Header>
          <Modal.Body>
            <Button variant="outline-secondary" onClick={this.handleCloseModal}>NO</Button>
            <Button variant="outline-danger float-right" onClick={this.handleRemoveChannel}>YES, REMOVE</Button>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default reduxForm({
  form: 'renameChannel',
})(RenameChannelModal);
