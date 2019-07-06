import React from 'react';

export default class MessageForm extends React.Component {
  render() {
    return (
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <button className="btn btn-outline-secondary" type="button" id="button-addon1">SEND</button>
        </div>
        <input
          type="text"
          className="form-control"
          placeholder=""
          aria-label="Example text with button addon"
          aria-describedby="button-addon1"
        />
      </div>
    );
  }
}
