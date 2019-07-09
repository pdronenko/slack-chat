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
  fetchMessages: actions.fetchMessages,
};

@connect(mapStateToProps, actionCreators)
class Channels extends React.Component {
  handleChangeChannel = (e) => {
    e.preventDefault();
    const channelId = Number(e.target.dataset.channelId);
    const { changeChannel, fetchMessages } = this.props;
    changeChannel({ channelId });
    fetchMessages(channelId);
  }

  renderChannels() {
    const { byId, allIds, currentChannelId } = this.props.channels;

    return allIds.map((id) => {
      const { name } = byId[id];
      const classes = cn ({
        ['list-group-item-action list-group-item']: true,
        active: id === currentChannelId,
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
        <FontAwesomeIcon icon={faTrashAlt} size="xs" color="white" />
        <FontAwesomeIcon icon={faPencilAlt} size="xs" color="white" />
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
