import React from 'react';
import cn from 'classnames';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';

const mapStateToProps = (state) => {
  const {
    channels,
    chatUIState: { currentChannelId },
    messagesFetchingState,
    socketConnectionState,
    channelsFetchingState,
  } = state;
  return {
    channels,
    currentChannelId,
    messagesFetchingState,
    socketConnectionState,
    channelsFetchingState,
  };
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
        className={`btn btn-outline-${isActive ? 'light' : 'secondary'} btn-sm float-right`}
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
      const isRequesting = messagesFetchingState === 'requested';
      const classes = cn({
        active: isActive,
        'list-group-item-action list-group-item': true,
        'btn-secondary': !isRequesting,
        'list-group-item-light disabled': isRequesting,
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
    const { channelsFetchingState } = this.props;
    const isFetching = channelsFetchingState === 'requested';
    const spinner = (
      <div className="d-flex justify-content-center">
        <div className="spinner-border text-secondary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );

    return (
      <div id="channels" className="list-group mt-2">
        {isFetching ? spinner : this.renderChannels()}
      </div>
    );
  }
}
