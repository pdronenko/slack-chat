import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import * as actions from '../actions';

const mapStateToProps = ({ chatUIState: { removeModalState, channelToRemove } }) => {
  return { removeModalState, channelToRemove };
};

const actionCreators = {
  removeChannel: actions.removeChannel,
  closeModal: actions.closeModal,
};

@connect(mapStateToProps, actionCreators)
class RenameChannelModal extends React.Component {
  handleRemoveChannel = async () => {
    const { removeChannel, channelToRemove, reset } = this.props;
    try {
      await removeChannel(channelToRemove);
    } catch (e) {
      throw new Error(e);
    }
  }

  handleCloseModal = () => {
    const { closeModal } = this.props;
    closeModal();
  }

  render() {
    const {
      removeModalState,
      submitting,
      channelToRemove,
      handleSubmit,
      pristine,
    } = this.props;
    return (
      <Modal show={removeModalState} onHide={this.handleCloseModal} size="sm" centered>
        <Modal.Body>
          <Button variant="outline-secondary" onClick={this.handleCloseModal}>CLOSE</Button>
          <Button variant="outline-danger ml-3" onClick={this.handleRemoveChannel}>DELETE CHANNEL</Button>
        </Modal.Body>
      </Modal>
    );
  }
}

export default RenameChannelModal;
