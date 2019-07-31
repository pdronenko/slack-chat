import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/application.css';
import '@babel/polyfill';
import faker from 'faker/locale/en';
import gon from 'gon';
import groupBy from 'lodash/groupBy';
import keyBy from 'lodash/keyBy';
import cookies from 'js-cookie';
import React from 'react';
import { render } from 'react-dom';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'; // eslint-disable-line
import { loadTranslations, setLocale, syncTranslationWithStore } from 'react-redux-i18n';
import reducers from './reducers';
import Chat from './components/Chat';
import UsernameContext from './UsernameContext';
import socketConnect from './socketClient';
import translationsObject from './translations.json';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const getUsername = () => {
  if (!cookies.get('username')) {
    cookies.set('username', faker.name.findName(), { expires: 7 });
  }
  return cookies.get('username');
};

const initState = {
  channels: {
    allIds: gon.channels.map(ch => ch.id),
    byId: keyBy(gon.channels, 'id'),
  },
  messages: groupBy(gon.messages, 'channelId'),
  chatUIState: {
    currentChannelId: gon.currentChannelId,
    channelToEdit: null,
    ModalChannelEditState: 'hide',
  },
};

const middleware = [thunk];

const store = createStore(
  reducers,
  initState,
  composeWithDevTools(applyMiddleware(...middleware)),
);

socketConnect(store);
syncTranslationWithStore(store);
store.dispatch(loadTranslations(translationsObject));
store.dispatch(setLocale('en'));

render(
  <Provider store={store}>
    <UsernameContext.Provider value={getUsername()}>
      <Chat />
    </UsernameContext.Provider>
  </Provider>,
  document.getElementById('chat'),
);
