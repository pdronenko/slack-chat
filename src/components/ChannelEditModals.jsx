import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import values from 'lodash/values';
import cn from 'classnames';
import { I18n } from 'react-redux-i18n';
import * as actionCreators from '../actions';
import { normalizeChannelName, validateChannelName } from '../fieldValidators';

const mapStateToProps = (state) => {
  const {
    chatUIState: { ModalChannelEditState, channelToEdit },
    i18n: { locale },
    channelRemovingState,
    socketConnectionState,
    channels,
  } = state;
  return {
    channels: channels.byId,
    channelNames: values(channels.byId).map(ch => ch.name),
    ModalChannelEditState,
    channelToEdit,
    socketConnectionState,
    channelRemovingState,
    locale,
  };
};

export default @reduxForm({ form: 'renameChannel' })
@connect(mapStateToProps, actionCreators)
class RenameChannelModal extends React.Component {
  validate = (value) => {
    const { channelNames } = this.props;
    return validateChannelName(channelNames, value);
  }

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

  render() {
    const {
      ModalChannelEditState,
      submitting,
      handleSubmit,
      pristine,
      error,
      invalid,
      channels,
      channelToEdit,
      socketConnectionState,
      channelRemovingState,
    } = this.props;
    const inputClasses = cn({
      'form-control': true,
      'is-invalid': error || invalid,
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
                validate={this.validate}
                component="input"
                className={inputClasses}
                placeholder={channelToEdit ? getPrevChannelName() : I18n.t('application.newChannel')}
                disabled={submitting}
                value="text"
              />
              <div className="input-group-append">
                <button
                  className="btn btn-secondary rounded-right"
                  type="submit"
                  disabled={pristine
                    || submitting
                    || socketConnectionState === 'disconnected'
                    || invalid}
                >
                  {submitting && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />}
                  {!submitting && I18n.t('application.rename')}
                </button>
              </div>
              <div className="invalid-feedback">
                {error || (invalid && I18n.t('application.channelExists'))}
              </div>
            </form>
            <hr />
            <Button
              variant="outline-danger btn-sm btn-block mt-2"
              onClick={this.handleShowRemoveModal}
              disabled={socketConnectionState === 'disconnected'
                || submitting}
            >
              {I18n.t('application.removeChannel')}
            </Button>
          </Modal.Body>
        </Modal>
        <Modal show={ModalChannelEditState === 'removeModal'} onHide={this.handleCloseModal} size="sm" centered>
          <Modal.Header>
            <h3>{I18n.t('application.areYouSure')}</h3>
          </Modal.Header>
          <Modal.Body>
            <Button variant="secondary" onClick={this.handleCloseModal}>{I18n.t('application.noRemove')}</Button>
            <Button
              variant="danger float-right"
              onClick={this.handleRemoveChannel}
              disabled={socketConnectionState === 'disconnected'
                || channelRemovingState === 'requested'}
            >
              {channelRemovingState === 'requested'
                ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                : I18n.t('application.yesRemove')}
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
