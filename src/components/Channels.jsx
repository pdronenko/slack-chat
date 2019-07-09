import React from 'react';
import cn from 'classnames';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import * as actions from '../actions';
import NewChannelForm from './NewChannelForm';

const mapStateToProps = ({ channels }) => ({ channels });

const actionCreators = {
  changeChannel: actions.changeChannel,
  renameChannel: actions.renameChannel,
  removeChannel: actions.removeChannel,
};

@connect(mapStateToProps, actionCreators)
class Channels extends React.Component {
  handleChangeChannel = (e) => {
    e.preventDefault();
    const channelId = Number(e.target.dataset.channelId);
    const { changeChannel, fetchMessages } = this.props;
    changeChannel({ channelId });
  }

  handleRenameChannel = channelId => async (e) => {
    e.stopPropagation();
    const { renameChannel } = this.props;
    try {
      await renameChannel(channelId, 'newGoodName');
    } catch (e) {
      throw new Error(e);
    }
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

  renderEditButtons(isActive, channelId) {
    return (
      <div className="float-right">
        <FontAwesomeIcon
          onClick={this.handleRenameChannel(channelId)}
          icon={faPencilAlt}
          color={isActive ? 'white' : 'LightGrey'}
          className="mr-2"
        />
        <FontAwesomeIcon
          onClick={this.handleRemoveChannel(channelId)}
          icon={faTrashAlt}
          color={isActive ? 'white' : 'LightCoral'}
        />
      </div>
    );
  }

  renderChannels() {
    const { byId, allIds, currentChannelId } = this.props.channels;

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
          onClick={this.handleChangeChannel}
        >
        {name}
        {removable && this.renderEditButtons(isActive, id)}
        </a>
      );
    })
  }

  render() {
    return (
      <>
        <div id="channels" className="list-group">
          {this.renderChannels()}
        </div>
        <NewChannelForm />
      </>
    );
  }
}

export default Channels;
