import io from 'socket.io-client';
import * as actions from './actions';

export default (store) => {
  const socket = io.connect();
  socket.on('connect', () => {
    console.log('socket connected');
    store.dispatch(actions.connectSocket());
  });
  socket.on('reconnect', () => {
    console.log('socket reconnected');
    const { chatUIState: { currentChannelId } } = store.getState();
    store.dispatch(actions.fetchChannels());
    store.dispatch(actions.fetchMessages({ channelId: currentChannelId }));
  });
  socket.on('newMessage', ({ data: { attributes } }) => {
    store.dispatch(actions.addMessageSuccess({ message: attributes }));
  });
  socket.on('newChannel', ({ data: { attributes } }) => {
    store.dispatch(actions.addChannelSuccess({ newChannel: attributes }));
  });
  socket.on('renameChannel', ({ data: { attributes } }) => {
    store.dispatch(actions.renameChannelSuccess({ renamedChannel: attributes }));
  });
  socket.on('removeChannel', ({ data: { id } }) => {
    store.dispatch(actions.removeChannelSuccess({ id }));
  });
  socket.on('disconnect', () => {
    console.log('socket disconnect');
    store.dispatch(actions.disconnectSocket());
  });
};
