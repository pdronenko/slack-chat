import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError  } from 'redux-form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import * as actions from '../actions';

const mapStateToProps = ({ chatUIState: { renameModalState } }) => {
  return { renameModalState };
};

const actionCreators = {
  renameChannel: actions.renameChannel,
  closeModal: actions.closeModal,
};

@connect(mapStateToProps, actionCreators)
class RenameChannelModal extends React.Component {
  handleRenameChannel = channelId => async (e) => {
    e.stopPropagation();
    const { renameChannel } = this.props;
    try {
      await renameChannel(channelId, 'newGoodName');
    } catch (e) {
      throw new Error(e);
    }
  }

  handleCloseModal = () => {
    const { closeModal } = this.props;
    closeModal();
  }

  render() {
    const { renameModalState, submitting } = this.props;
    return (
      <Modal show={renameModalState} onHide={this.handleCloseModal} centered>
        <Modal.Footer>
          <Field
            name="newChannelName"
            required
            component="input"
            type="text"
            className="form-control"
            disabled={submitting}
            autoFocus
          />
          <Button variant="outline-primary" onClick={this.handleRenameChannel(3)}>
            RENAME
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default reduxForm({
  form: 'renameChannel',
})(RenameChannelModal);
