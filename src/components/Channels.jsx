import React from 'react';
import cn from 'classnames';

export default class Channels extends React.Component {
  renderChannels() {
    const { channels, currentChannelId } = this.props;
    return channels.map((ch) => {
      const classes = cn ({
        ['list-group-item-action list-group-item']: true,
        active: ch.id === 1,
      });
      return (
        <a href={`#${ch.id}`} key={ch.id} className={classes} data-channel-id={ch.id}>{ch.name}</a>
      );
    })
  }

  render() {
    return (<div id="channels" className="col-2 list-group">{this.renderChannels()}</div>);
  }
}
