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
import * as actions from './actions';

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
    byId: gon.channels.reduce((acc, ch) => ({ ...acc, [ch.id]: ch }), {}),
    allIds: gon.channels.map(ch => ch.id),
  },
  messages: [],
  chatUIState: {
    currentChannelId: 1,
    fetchMessageStatus: 'idle', // request, success, failure
    channelToEdit: null,
    channelModalState: false,
    removeModalState: false,
  },
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
  store.dispatch(actions.addMessageSuccess({ message: attributes }));
});
socket.on('newChannel', function ({ data: { attributes } }) {
  store.dispatch(actions.addChannelSuccess({ newChannel: attributes }));
});
socket.on('renameChannel', function ({ data: { attributes } }) {
  store.dispatch(actions.renameChannelSuccess({ renamedChannel: attributes }));
});
socket.on('removeChannel', function ({ data: { id } }) {
  store.dispatch(actions.removeChannelSuccess({ id }));
});

const container = document.getElementById('chat');
render(
  <Provider store={store}>
    <UsernameContext.Provider value={getUsername()}>
      <Chat />
    </UsernameContext.Provider>
  </Provider>
, container);
