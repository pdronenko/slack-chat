import React from 'react';
import cn from 'classnames';
import { connect } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown';
import * as actions from '../actions';

const mapStateToProps = ({ channels, chatUIState: { currentChannelId, fetchMessageStatus } }) => {
  return { channels, currentChannelId, fetchMessageStatus };
};

const actionCreators = {
  changeChannel: actions.changeChannel,
  fetchMessages: actions.fetchMessages,
  showChannelModal: actions.showChannelModal,
};

@connect(mapStateToProps, actionCreators)
export default class Channels extends React.Component {
  handleChangeChannel = (e) => {
    e.preventDefault();
    const channelId = Number(e.target.dataset.channelId);
    const { changeChannel, fetchMessages, currentChannelId } = this.props;
    if (currentChannelId === channelId) {
      return;
    }
    changeChannel({ channelId });
    fetchMessages(channelId);
  }

  handleShowChannelModal = channelId => (e) => {
    e.stopPropagation();
    e.preventDefault();
    const { showChannelModal } = this.props;
    showChannelModal({ channelId });
  }

  renderEditButtons(isActive, channelId) {
    return (
      <button
        type="button"
        className={`btn btn-outline-${isActive ? 'light' : 'primary'} btn-sm float-right`}
        onClick={this.handleShowChannelModal(channelId)}
      >
        EDIT
      </button>
    );
  }

  renderChannels() {
    const {
      channels: { byId, allIds },
      currentChannelId,
      fetchMessageStatus,
    } = this.props;

    return allIds.map((id) => {
      const isActive = id === currentChannelId;
      const { name, removable } = byId[id];
      const classes = cn ({
        ['list-group-item-action list-group-item']: true,
        active: isActive,
      });
      return (
        <a
          href={`#${id}`}
          key={id}
          className={classes}
          data-channel-id={id}
          onClick={fetchMessageStatus === 'success' ? this.handleChangeChannel : null}
        >
        {name}
        {removable && this.renderEditButtons(isActive, id)}
        </a>
      );
    })
  }

  render() {
    return (
      <div id="channels" className="list-group">
        {this.renderChannels()}
      </div>
    );
  }
}
