import axios from 'axios';
import { createAction } from 'redux-actions';
import routes from '../routes';

export const connectSocket = createAction('SOCKET_CONNECT');
export const disconnectSocket = createAction('SOCKET_DISCONNECT');

export const fetchMessagesRequest = createAction('MESSAGES_FETCH_REQUEST');
export const fetchMessagesSuccess = createAction('MESSAGES_FETCH_SUCCESS');
export const fetchMessagesFailure = createAction('MESSAGES_FETCH_FAILURE');

export const removeChannelRequest = createAction('CHANNEL_REMOVE_REQUEST');
export const removeChannelSuccess = createAction('CHANNEL_REMOVE_SUCCESS');
export const removeChannelFailure = createAction('CHANNEL_REMOVE_FAILURE');

export const renameChannelRequest = createAction('CHANNEL_RENAME_REQUEST');
export const renameChannelSuccess = createAction('CHANNEL_RENAME_SUCCESS');
export const renameChannelFailure = createAction('CHANNEL_RENAME_FAILURE');

export const addMessageRequest = createAction('MESSAGE_ADD_REQUEST');
export const addMessageSuccess = createAction('MESSAGE_ADD_SUCCESS');
export const addMessageFailure = createAction('MESSAGE_ADD_FAILURE');

export const addChannelRequest = createAction('CHANNEL_ADD_REQUEST');
export const addChannelSuccess = createAction('CHANNEL_ADD_SUCCESS');
export const addChannelFailure = createAction('CHANNEL_ADD_FAILURE');

export const changeChannel = createAction('CHANNEL_CHANGE');
export const showChannelModal = createAction('MODAL_CHANNEL_SHOW');
export const showRemoveModal = createAction('MODAL_REMOVE_SHOW');
export const closeModal = createAction('MODAL_CLOSE');

export const addMessage = message => async (dispatch) => {
  dispatch(addMessageRequest());
  try {
    const { channelId } = message;
    await axios.post(routes.messagesPath(channelId), {
      data: {
        attributes: message,
      },
    });
  } catch (e) {
    dispatch(addMessageFailure());
    console.log(e);
    throw e;
  }
};

export const addChannel = name => async (dispatch) => {
  dispatch(addChannelRequest());
  try {
    await axios.post(routes.channelsPath(), {
      data: {
        attributes: { name },
      },
    });
  } catch (e) {
    dispatch(addChannelFailure());
    console.log(e);
    throw e;
  }
};

export const fetchMessages = currentChannelId => async (dispatch) => {
  dispatch(fetchMessagesRequest());
  try {
    const { data } = await axios.get(routes.messagesPath(currentChannelId));
    dispatch(fetchMessagesSuccess({
      messagesList: data.map(msg => msg.attributes),
      currentChannelId,
    }));
  } catch (e) {
    dispatch(fetchMessagesFailure());
    console.log(e);
    throw e;
  }
};

export const renameChannel = (channelId, name) => async (dispatch) => {
  dispatch(renameChannelRequest());
  try {
    await axios.patch(routes.channelPath(channelId), {
      data: {
        attributes: { name },
      },
    });
  } catch (e) {
    dispatch(renameChannelFailure());
    console.log(e);
    throw e;
  }
};

export const removeChannel = channelId => async (dispatch) => {
  dispatch(removeChannelRequest());
  try {
    await axios.delete(routes.channelPath(channelId));
  } catch (e) {
    dispatch(removeChannelFailure());
    console.log(e);
    throw e;
  }
};
