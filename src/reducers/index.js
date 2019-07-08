import { combineReducers, createStore } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const channels = handleActions({
  [actions.changeChannel](state, { payload: { id } }) {
    return { ...state, currentChannelId: id };
  },
}, {});

const messageAddingState = handleActions({
  [actions.addMessageRequest]() {
    return 'requested';
  },
  [actions.addMessageFailure]() {
    return 'failed';
  },
  [actions.addMessageSuccess]() {
    return 'finished';
  },
}, 'none');

const messages = handleActions({
  [actions.addMessage](state, { payload }) {
    console.log(payload);
  },
  // [actions.addMessage](state, { payload }) {
  //   const { channelId } = message.message;
  //   const channelMessages = state[channelId];
  //   const newMessages = channelMessages ? [...channelMessages, message] : [message];
  //   return { ...state, [channelId]: newMessages };
  // },
}, {});

// const channels = (state = {}, action) => {
//   switch (action.type) {
//     case 'CHANNEL_ADD':
//       return state;
//     case 'CHANNEL_REMOVE':
//       return state;
//     case 'CHANNEL_RENAME':
//       return state;
//     case 'CHANNEL_CHANGE':
//       return { ...state, currentChannelId: action.payload.id };
//     default:
//       return state;
//   }
// };

// const messages = (state = {}, action) => {
//   switch (action.type) {
//     case 'MESSAGE_ADD':
//       const { message } = action.payload;
//       const { channelId } = message;
//       const channelMessages = state[channelId];
//       const newMessages = channelMessages ? [...channelMessages, message] : [message];
//       return { ...state, [channelId]: newMessages };
//     case 'CHANNEL_CHANGE':
//       return state;
//     default:
//       return state;
//   }
// };

const userData = (state = {}, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default combineReducers({
  channels,
  messages,
  userData,
  form: formReducer,
});

