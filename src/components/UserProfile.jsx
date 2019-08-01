import React, { useContext } from 'react';
import { Translate } from 'react-redux-i18n';
import UsernameContext from '../UsernameContext';

const UserProfile = () => (
  <div>
    <Translate value="application.welcomeUser" />
    ,
    <br />
    <span className="text-info"><strong>{useContext(UsernameContext)}</strong></span>
  </div>
);

export default UserProfile;
