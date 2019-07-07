import React from 'react';
import cn from 'classnames';
import { connect } from 'react-redux';
import * as actions from '../actions';

const mapStateToProps = ({ channels }) => ({ channels });

const actionCreators = {
  changeChannel: actions.changeChannel,
};

class Channels extends React.Component {
  handleChangeChannel = (e) => {
    e.preventDefault();
    const id = e.target.dataset.channelId;
    const { changeChannel } = this.props;
    changeChannel(Number(id));
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
        </a>
      );
    })
  }

  render() {
    return (
      <div className="col-2">
        <div id="channels" className="list-group">{this.renderChannels()}</div>
      </div>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(Channels);
