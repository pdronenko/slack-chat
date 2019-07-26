import React, { useContext } from 'react';
import { withTranslation } from 'react-i18next';
import UsernameContext from '../UsernameContext';

const UserProfile = ({ t }) => (
  <div>
    {`${t('welcome_user')},`}
    <br />
    <span className="text-info"><strong>{useContext(UsernameContext)}</strong></span>
  </div>
);

export default withTranslation()(UserProfile);
