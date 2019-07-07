import React from 'react';

export default class Messages extends React.Component {
  render() {
    return (
      <div id="messages-container" className="col-8" style={{ height: '100vh' }}>
        <div id="messages" className="h-75 border border-light rounded">
          
        </div>
        <div id="message-form">
          {this.props.children}
        </div>
      </div>
    );
  }
}
