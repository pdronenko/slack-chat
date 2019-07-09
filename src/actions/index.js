import axios from 'axios';
import { createAction } from 'redux-actions';
import routes from '../routes';

export const fetchMessagesRequest = createAction('MESSAGES_FETCH_REQUEST');
export const fetchMessagesSuccess = createAction('MESSAGES_FETCH_SUCCESS');
export const fetchMessagesFailure = createAction('MESSAGES_FETCH_FAILURE');

export const addMessageRequest = createAction('MESSAGE_ADD_REQUEST');
export const addMessageSuccess = createAction('MESSAGE_ADD_SUCCESS');
export const addMessageFailure = createAction('MESSAGE_ADD_FAILURE');

export const fetchChannelsRequest = createAction('CHANNELS_FETCH_REQUEST');
export const fetchChannelsSuccess = createAction('CHANNELS_FETCH_SUCCESS');
export const fetchChannelsFailure = createAction('CHANNELS_FETCH_FAILURE');

export const changeChannel = createAction('CHANNEL_CHANGE');

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
    console.log(e)
    throw e;
  }
};

export const fetchMessages =  currentChannelId => async (dispatch) => {
  dispatch(fetchMessagesRequest());
  try {
    const { data } = await axios.get(routes.messagesPath(currentChannelId));
    dispatch(fetchMessagesSuccess({ messages: data }));
  } catch (e) {
    dispatch(fetchMessagesFailure());
    console.log(e)
    throw e;
  }
};

// export const addChannelRequest = createAction('CHANNEL_ADD_REQUEST');
// export const addChannelSuccess = createAction('CHANNEL_ADD_SUCCESS');
// export const addChannelFailure = createAction('CHANNEL_ADD_FAILURE');
//
// export const removeChannelRequest = createAction('CHANNEL_REMOVE_REQUEST');
// export const removeChannelSuccess = createAction('CHANNEL_REMOVE_SUCCESS');
// export const removeChannelFailure = createAction('CHANNEL_REMOVE_FAILURE');
//
// export const renameChannelRequest = createAction('CHANNEL_RENAME_REQUEST');
// export const renameChannelSuccess = createAction('CHANNEL_RENAME_SUCCESS');
// export const renameChannelFailure = createAction('CHANNEL_RENAME_FAILURE');
