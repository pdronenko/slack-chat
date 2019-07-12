import io from 'socket.io-client';
import * as actions from './actions';

export default (store) => {
  const socket = io.connect();
  socket.on('connect', function () {
    console.log('socket connected');
    store.dispatch(actions.connectChat());
  });
  socket.on('reconnect', function () {
    console.log('socket reconnected');
    const { chatUIState: { currentChannelId } } = store.getState();
    store.dispatch(actions.fetchMessages(currentChannelId));
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
  socket.on('disconnect', function () {
    console.log('socket disconnect');
    store.dispatch(actions.disconnectChat());
  });
};