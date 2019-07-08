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
  messages: gon.messages
    .reduce((acc, msg) => ({ ...acc, [msg.channelId]: union(acc[msg.channelId], [msg]) }), {}),
  userData: {
    username: getUsername(),
  },
};

const socket = io.connect('http://localhost:4000');
socket.on('connect', function () {
  console.log('socket connected');
})
socket.on('newMessage', function ({ data: { attributes } }) {
  initState.messages[attributes.channelId].push(attributes);
})

const ext = window.__REDUX_DEVTOOLS_EXTENSION__;
const devtoolMiddleware = ext && ext();
const store = createStore(
  reducers,
  initState,
  compose(
    applyMiddleware(thunk),
    devtoolMiddleware,
  ),
);


const container = document.getElementById('chat');
render(
  <Provider store={store}>
    <Chat />
  </Provider>
, container);
