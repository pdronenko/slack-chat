import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = ({ userData: { username } }) => ({ username });

class UserProfile extends React.Component {
  render() {
    const { username } = this.props;
    return (
      <div>
        Welcome,
        <br />
        <strong>{username}</strong>
      </div>
    );
  }
}

export default connect(mapStateToProps)(UserProfile);
