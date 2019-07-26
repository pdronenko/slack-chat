import axios from 'axios';
import { createAction } from 'redux-actions';
import routes from '../routes';

export const connectSocket = createAction('SOCKET_CONNECT');
export const disconnectSocket = createAction('SOCKET_DISCONNECT');

export const fetchChannelsRequest = createAction('CHANNELS_FETCH_REQUEST');
export const fetchChannelsSuccess = createAction('CHANNELS_FETCH_SUCCESS');
export const fetchChannelsFailure = createAction('CHANNELS_FETCH_FAILURE');

export const fetchMessagesRequest = createAction('MESSAGES_FETCH_REQUEST');
export const fetchMessagesSuccess = createAction('MESSAGES_FETCH_SUCCESS');
export const fetchMessagesFailure = createAction('MESSAGES_FETCH_FAILURE');

export const removeChannelRequest = createAction('CHANNEL_REMOVE_REQUEST');
export const removeChannelSuccess = createAction('CHANNEL_REMOVE_SUCCESS');
export const removeChannelFailure = createAction('CHANNEL_REMOVE_FAILURE');

export const changeChannel = createAction('CHANNEL_CHANGE');
export const showRenameModal = createAction('MODAL_RENAME_SHOW');
export const showRemoveModal = createAction('MODAL_REMOVE_SHOW');
export const closeModal = createAction('MODAL_CLOSE');

export const addMessageSuccess = createAction('MESSAGE_ADD_SUCCESS');
export const addChannelSuccess = createAction('CHANNEL_ADD_SUCCESS');
export const renameChannelSuccess = createAction('CHANNEL_RENAME_SUCCESS');

export const addMessage = message => async () => {
  const data = { attributes: message };
  await axios.post(routes.messagesPath(message.channelId), { data });
};

export const addChannel = name => async () => {
  const data = { attributes: { name } };
  await axios.post(routes.channelsPath(), { data });
};

export const renameChannel = (channelId, name) => async () => {
  const data = { attributes: { name } };
  await axios.patch(routes.channelPath(channelId), { data });
};

export const fetchChannels = () => async (dispatch) => {
  dispatch(fetchChannelsRequest());
  try {
    const { data } = await axios.get(routes.channelsPath());
    dispatch(fetchChannelsSuccess({ channelsList: data.map(ch => ch.attributes) }));
  } catch (e) {
    dispatch(fetchChannelsFailure());
    throw e;
  }
};

export const fetchMessages = ({ channelId }) => async (dispatch) => {
  dispatch(fetchMessagesRequest());
  try {
    const { data } = await axios.get(routes.messagesPath(channelId));
    dispatch(fetchMessagesSuccess({
      messagesList: data.map(msg => msg.attributes),
      channelId,
    }));
  } catch (e) {
    dispatch(fetchMessagesFailure());
    throw e;
  }
};

export const removeChannel = channelId => async (dispatch) => {
  dispatch(removeChannelRequest());
  try {
    await axios.delete(routes.channelPath(channelId));
  } catch (e) {
    dispatch(removeChannelFailure());
    throw e;
  }
};
