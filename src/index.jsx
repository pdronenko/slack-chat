import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/application.css';
import faker from 'faker';
import gon from 'gon';
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

const initState = {
  channels: {
    byId: gon.channels.reduce((acc, ch) => ({ ...acc, [ch.id]: ch }), {}),
    allIds: gon.channels.map(ch => ch.id),
    currentChannelId: gon.currentChannelId,
  },
  messages: {},
  userData: {
    username: faker.name.findName(),
  },
};

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
