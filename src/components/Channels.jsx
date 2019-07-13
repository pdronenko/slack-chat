import React from 'react';
import cn from 'classnames';
import { connect } from 'react-redux';
import * as actions from '../actions';

const mapStateToProps = (state) => {
  const {
    channels, chatUIState: { currentChannelId }, messagesFetchingState, socketConnectionState,
  } = state;
  return {
    channels, currentChannelId, messagesFetchingState, socketConnectionState,
  };
};

const actionCreators = {
  changeChannel: actions.changeChannel,
  fetchMessages: actions.fetchMessages,
  showRenameModal: actions.showRenameModal,
};

export default @connect(mapStateToProps, actionCreators)
class Channels extends React.Component {
  handleChangeChannel = (e) => {
    e.preventDefault();
    const channelId = Number(e.target.dataset.channelId);
    const {
      changeChannel, fetchMessages, currentChannelId, socketConnectionState,
    } = this.props;
    if (currentChannelId !== channelId) {
      changeChannel({ channelId });
    }
    if (socketConnectionState === 'connected') {
      fetchMessages({ channelId });
    }
  }

  handleShowChannelModal = channelId => (e) => {
    e.stopPropagation();
    e.preventDefault();
    const { showRenameModal } = this.props;
    showRenameModal({ channelId });
  }

  renderEditButtons(isActive, channelId) {
    const { socketConnectionState } = this.props;
    return (
      <input
        type="button"
        className={`btn btn-outline-${isActive ? 'light' : 'primary'} btn-sm float-right`}
        onClick={this.handleShowChannelModal(channelId)}
        disabled={socketConnectionState === 'disconnected'}
        value="EDIT"
      />
    );
  }

  renderChannels() {
    const {
      channels: { byId, allIds }, currentChannelId, messagesFetchingState,
    } = this.props;

    return allIds.map((id) => {
      const isActive = id === currentChannelId;
      const { name, removable } = byId[id];
      const classes = cn({
        'list-group-item-action list-group-item': true,
        active: isActive,
        disabled: messagesFetchingState === 'requested',
      });
      return (
        <a
          href={`#${id}`}
          key={id}
          className={classes}
          data-channel-id={id}
          onClick={this.handleChangeChannel}
        >
          {name}
          {removable && this.renderEditButtons(isActive, id)}
        </a>
      );
    });
  }

  render() {
    return (
      <div id="channels" className="list-group">
        {this.renderChannels()}
      </div>
    );
  }
}
