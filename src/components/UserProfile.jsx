import React, { useContext } from 'react';
import UsernameContext from '../UsernameContext';
import { withTranslation } from 'react-i18next';

const UserProfile = ({ t }) => (
  <div>
    {t('welcome_react')},
    <br />
    <span className="text-info"><strong>{useContext(UsernameContext)}</strong></span>
  </div>
);

export default withTranslation()(UserProfile);
