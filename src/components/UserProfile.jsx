import React from 'react';
import UsernameContext from '../UsernameContext';

const UserProfile = () => (
  <div>
    Welcome,
    <br />
    <UsernameContext.Consumer>
      {username => <span className="text-primary"><strong>{username}</strong></span>}
    </UsernameContext.Consumer>
  </div>
);

export default UserProfile;
