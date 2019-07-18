import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import cn from 'classnames';
import * as actionCreators from '../actions';
import { normalizeChannelName } from '../fieldValidators';

const mapStateToProps = (state) => {
  const {
    chatUIState: { ModalChannelEditState, channelToEdit },
    channelRemovingState,
    socketConnectionState,
    channels,
  } = state;
  return {
    ModalChannelEditState,
    channelToEdit,
    channels: channels.byId,
    socketConnectionState,
    channelRemovingState,
  };
};


export default @reduxForm({ form: 'renameChannel' })
@connect(mapStateToProps, actionCreators)
class RenameChannelModal extends React.Component {
  handleRenameChannel = async ({ newChannelName }) => {
    const {
      renameChannel, reset, channelToEdit, closeModal,
    } = this.props;
    try {
      await renameChannel(channelToEdit, newChannelName);
    } catch (e) {
      throw new SubmissionError({ _error: e.message });
    }
    reset();
    closeModal();
  }

  handleRemoveChannel = async () => {
    const { removeChannel, channelToEdit, closeModal } = this.props;
    try {
      await removeChannel(channelToEdit);
    } catch (e) {
      throw new Error(e);
    }
    closeModal();
  }

  handleCloseModal = () => {
    const { closeModal } = this.props;
    closeModal();
  }

  handleShowRemoveModal = () => {
    const { showRemoveModal } = this.props;
    showRemoveModal();
  }

  render() {
    const {
      ModalChannelEditState,
      submitting,
      handleSubmit,
      pristine,
      error,
      channels,
      channelToEdit,
      socketConnectionState,
      channelRemovingState,
    } = this.props;
    const inputClasses = cn({
      'form-control': true,
      'is-invalid': error,
    });
    const getPrevChannelName = () => channels[channelToEdit].name;

    return (
      <div id="modals">
        <Modal show={ModalChannelEditState === 'renameModal'} onHide={this.handleCloseModal} size="sm" centered>
          <Modal.Body>
            <form className="input-group" onSubmit={handleSubmit(this.handleRenameChannel)}>
              <Field
                name="newChannelName"
                type="text"
                normalize={normalizeChannelName}
                component="input"
                className={inputClasses}
                placeholder={channelToEdit ? getPrevChannelName() : 'New channel name'}
                disabled={submitting}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-primary"
                  type="submit"
                  disabled={pristine
                    || submitting
                    || socketConnectionState === 'disconnected'}
                >
                  {submitting && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />}
                  {!submitting && 'RENAME'}
                </button>
              </div>
              <div className="invalid-feedback">
                {error}
              </div>
            </form>
            <hr />
            <Button
              variant="outline-danger btn-sm btn-block mt-2"
              onClick={this.handleShowRemoveModal}
              disabled={socketConnectionState === 'disconnected'
                || submitting}
            >
              REMOVE CHANNEL
            </Button>
          </Modal.Body>
        </Modal>
        <Modal show={ModalChannelEditState === 'removeModal'} onHide={this.handleCloseModal} size="sm" centered>
          <Modal.Header>
            <h3>Are you sure?</h3>
          </Modal.Header>
          <Modal.Body>
            <Button variant="secondary" onClick={this.handleCloseModal}>NO</Button>
            <Button
              variant="danger float-right"
              onClick={this.handleRemoveChannel}
              disabled={socketConnectionState === 'disconnected'
                || channelRemovingState === 'requested'}
            >
              {channelRemovingState === 'requested'
                ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                : 'YES, REMOVE'}
            </Button>
            {channelRemovingState === 'failed'
              ? <div className="float-right text-danger">Network error, try again</div>
              : null}
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
