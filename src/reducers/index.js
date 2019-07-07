import { combineReducers, createStore } from 'redux';
import { reducer as formReducer } from 'redux-form';

const channels = (state = {}, action) => {
  switch (action.type) {
    case 'CHANNEL_ADD':
      return state;
    case 'CHANNEL_REMOVE':
      return state;
    case 'CHANNEL_RENAME':
      return state;
    case 'CHANNEL_CHANGE':
      return { ...state, currentChannelId: action.payload.id };
    default:
      return state;
  }
};

const messages = (state = {}, action) => {
  switch (action.type) {
    case 'MESSAGE_ADD':
      return state;
    case 'CHANNEL_CHANGE':
      return state;
    default:
      return state;
  }
};

const username = (state = '', action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default combineReducers({
  channels,
  messages,
  username,
  form: formReducer,
});

