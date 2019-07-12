import io from 'socket.io-client';
import * as actions from './actions';

export default (dispatch) => {
  const socket = io.connect();
  socket.on('connect', function () {
    console.log('socket connected');
  });
  socket.on('newMessage', function ({ data: { attributes } }) {
    dispatch(actions.addMessageSuccess({ message: attributes }));
  });
  socket.on('newChannel', function ({ data: { attributes } }) {
    dispatch(actions.addChannelSuccess({ newChannel: attributes }));
  });
  socket.on('renameChannel', function ({ data: { attributes } }) {
    dispatch(actions.renameChannelSuccess({ renamedChannel: attributes }));
  });
  socket.on('removeChannel', function ({ data: { id } }) {
    dispatch(actions.removeChannelSuccess({ id }));
  });
  socket.on('disconnect', function () {
    console.log('nooo, disconnect');
  });
};