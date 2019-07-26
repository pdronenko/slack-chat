import React, { useContext } from 'react';
import UsernameContext from '../UsernameContext';

const UserProfile = () => (
  <div>
    Welcome,
    <br />
    <span className="text-primary"><strong>{useContext(UsernameContext)}</strong></span>
  </div>
);

export default UserProfile;
