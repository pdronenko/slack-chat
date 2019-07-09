import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/application.css';
import "@babel/polyfill";
import faker from 'faker';
import gon from 'gon';
import { union } from 'lodash';
import cookies from 'js-cookie';
import io from 'socket.io-client';
import React from 'react';
import { render } from 'react-dom';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers'
import Chat from './components/Chat';
import UsernameContext from './UsernameContext';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { addMessageSuccess, addChannelSuccess } from './actions';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const getUsername = () => {
  if (!cookies.get('username')) {
    cookies.set('username', faker.name.findName());
  }
  return cookies.get('username');
};

const initState = {
  channels: {
    byId: gon.channels.reduce((acc, ch) => ({ ...acc, [ch.id]: ch }), {}),
    allIds: gon.channels.map(ch => ch.id),
    currentChannelId: gon.currentChannelId,
  },
  messages: [],
};

const middleware = [thunk];

const store = createStore(
  reducers,
  initState,
  composeWithDevTools(applyMiddleware(...middleware))
);

const socket = io.connect();
socket.on('connect', function () {
  console.log('socket connected');
});
socket.on('newMessage', function ({ data: { attributes } }) {
  store.dispatch(addMessageSuccess({ message: attributes }));
});
socket.on('newChannel', function ({ data: { attributes } }) {
  store.dispatch(addChannelSuccess({ newChannel: attributes }));
})

const container = document.getElementById('chat');
render(
  <Provider store={store}>
    <UsernameContext.Provider value={getUsername()}>
      <Chat />
    </UsernameContext.Provider>
  </Provider>
, container);
