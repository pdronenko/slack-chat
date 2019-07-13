import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import * as actions from '../actions';
import { normalizeChannelName } from '../fieldValidators';
import ChannelNameInput from './ChannelNameInput';

const mapStateToProps = ({
  chatUIState: {
    ModalChannelEditState,
    removeModalState,
    channelToEdit
  },
}) => {
  return { ModalChannelEditState, removeModalState, channelToEdit };
};

const actionCreators = {
  renameChannel: actions.renameChannel,
  removeChannel: actions.removeChannel,
  closeModal: actions.closeModal,
  showRemoveModal: actions.showRemoveModal,
};

const popover = () => (
  <Popover id="popover-basic">
    <Popover.Title as="h3">Popover right</Popover.Title>
    <Popover.Content>
      And here's some <strong>amazing</strong> content. It's very engaging.
      right?
    </Popover.Content>
  </Popover>
);

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
    showRemoveModal();
  }

  renderEditModal() {

  }

  render() {
    const {
      ModalChannelEditState,
      removeModalState,
      submitting,
      handleSubmit,
      pristine,
      invalid,
    } = this.props;
    return (
      <div id="modals">
        <Modal show={ModalChannelEditState === 'renameModal'} onHide={this.handleCloseModal} size="sm" centered>
          <Modal.Body>
            <form className="input-group" onSubmit={handleSubmit(this.handleRenameChannel)}>
              <Field
                name="newChannelName"
                normalize={normalizeChannelName}
                component={ChannelNameInput}
                label="New channel name"
                disabled={submitting}
              >
                <div className="input-group-append">
                  <input
                    className="btn btn-primary"
                    type="submit"
                    value="RENAME"
                    disabled={pristine || submitting || invalid}
                  />
                </div>
              </Field>
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
        <Modal show={ModalChannelEditState === 'removeModal'} onHide={this.handleCloseModal} size="sm" centered>
          <Modal.Header>
            <h3>Are you sure?</h3>
          </Modal.Header>
          <Modal.Body>
            <Button variant="secondary" onClick={this.handleCloseModal}>NO</Button>
            <Button variant="danger float-right" onClick={this.handleRemoveChannel}>YES, REMOVE</Button>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default reduxForm({
  form: 'renameChannel',
})(RenameChannelModal);
