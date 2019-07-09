import { combineReducers, createStore } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { handleActions } from 'redux-actions';
import { union } from 'lodash';
import update from 'immutability-helper';
import * as actions from '../actions';

const channels = handleActions({
  [actions.addChannelSuccess](state, { payload: { newChannel } }) {
    const { allIds, byId, currentChannelId } = state;
    const { id } = newChannel;
    return {
      allIds: [...allIds, id],
      byId: { ...byId, [id]: newChannel },
      currentChannelId,
    };
  },
  [actions.renameChannelSuccess](state, { payload: { renamedChannel } }) {
    const { byId, allIds, currentChannelId } = state;
    const { id } = renamedChannel;
    return {
      allIds,
      byId: { ...byId, [id]: renamedChannel },
      currentChannelId,
    };
  },
  [actions.removeChannelSuccess](state, { payload: { id } }) {
    const { allIds, byId, currentChannelId } = state;
    const newCurrentChannelId = currentChannelId === id ? 1 : currentChannelId;
    return {
      allIds: allIds.filter(chId => chId !== id),
      byId: update(byId, { $unset: [id] }),
      currentChannelId: newCurrentChannelId,
    };
  },
  [actions.changeChannel](state, { payload: { channelId } }) {
    return { ...state, currentChannelId: channelId };
  },
}, {});

const messages = handleActions({
  [actions.fetchMessagesSuccess](state, { payload: { messages } }) {
    return messages.map(msg => msg.attributes);
  },
  [actions.addMessageSuccess](state, { payload: { message } }) {
    return [...state, message];
  },
}, {});

export default combineReducers({
  channels,
  messages,
  form: formReducer,
});

// const messageAddingState = handleActions({
//   [actions.fetchMessagesRequest]() {
//     return 'requested';
//   },
//   [actions.fetchMessagesFailure]() {
//     return 'failed';
//   },
//   [actions.fetchMessagesSuccess]() {
//     return 'finished';
//   },
// }, 'none');
//
// const messageFetchingState = handleActions({
//   [actions.addMessageRequest]() {
//     return 'requested';
//   },
//   [actions.addMessageFailure]() {
//     return 'failed';
//   },
//   [actions.addMessageSuccess]() {
//     return 'finished';
//   },
// }, 'none');
//
// const channelAddingState = handleActions({
//   [actions.addChannelRequest]() {
//     return 'requested';
//   },
//   [actions.addChannelFailure]() {
//     return 'failed';
//   },
//   [actions.addChannelSuccess]() {
//     return 'finished';
//   },
// }, 'none');
