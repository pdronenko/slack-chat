import React from 'react';
import cn from 'classnames';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import Dropdown from 'react-bootstrap/Dropdown';
import * as actions from '../actions';

const mapStateToProps = ({ channels, chatUIState: { currentChannelId, fetchMessageStatus } }) => {
  return { channels, currentChannelId, fetchMessageStatus };
};

const actionCreators = {
  changeChannel: actions.changeChannel,
  renameChannel: actions.renameChannel,
  removeChannel: actions.removeChannel,
  renameModalShow: actions.renameModalShow,
};

@connect(mapStateToProps, actionCreators)
class Channels extends React.Component {
  handleChangeChannel = (e) => {
    e.preventDefault();
    const channelId = Number(e.target.dataset.channelId);
    const { changeChannel, fetchMessages } = this.props;
    changeChannel({ channelId });
  }

  handleRemoveChannel = channelId => async (e) => {
    e.stopPropagation();
    const { removeChannel } = this.props;
    try {
      await removeChannel(channelId);
    } catch (e) {
      throw new Error(e);
    }
  }

  stopPropagation = (e) => {
    e.stopPropagation();
  }

  handleShowRenameModal = channelId => () => {
    const { renameModalShow } = this.props;

    renameModalShow({ channelId });
  }

  renderEditButtons(isActive, channelId) {
    return (
      <div className="float-right" onClick={this.stopPropagation}>
        <FontAwesomeIcon
          onClick={this.handleShowRenameModal(channelId)}
          icon={faPencilAlt}
          size="lg"
          color={isActive ? 'white' : 'LightGrey'}
          className="mr-2"
        />
        <FontAwesomeIcon
          icon={faTrashAlt}
          size="lg"
          color={isActive ? 'white' : 'LightCoral'}
        />
      </div>
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

export default Channels;
