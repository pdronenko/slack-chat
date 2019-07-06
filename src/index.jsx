import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/application.css';
import faker from 'faker';
import gon from 'gon';
import cookies from 'js-cookie';
import io from 'socket.io-client';
import React from 'react';
import ReactDOM from 'react-dom';
import Chat from './components/Chat';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const container = document.getElementById('chat');
ReactDOM.render(<Chat {...gon} />, container);
