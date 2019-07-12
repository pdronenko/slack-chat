import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { handleActions } from 'redux-actions';
import update from 'immutability-helper';
import * as actions from '../actions';

const chatConnectionState = handleActions({
  [actions.disconnectChat]() {
    return 'disconnected';
  },
  [actions.connectChat]() {
    return 'connected';
  },
}, 'idle');

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
}, {});

const messages = handleActions({
  [actions.fetchMessagesSuccess](state, { payload: { messages } }) {
    return messages.map(msg => msg.attributes);
  },
  [actions.addMessageSuccess](state, { payload: { message } }) {
    return [...state, message];
  },
}, {});

const chatUIState = handleActions({
  [actions.changeChannel](state, { payload: { channelId } }) {
    return { ...state, currentChannelId: channelId };
  },
  [actions.fetchMessagesRequest](state) {
    return { ...state, fetchMessageStatus: 'request' };
  },
  [actions.fetchMessagesSuccess](state) {
    return { ...state, fetchMessageStatus: 'success' };
  },
  [actions.fetchMessagesFailure](state) {
    return { ...state, fetchMessageStatus: 'failure' };
  },
  [actions.showChannelModal](state, { payload: { channelId } }) {
    return { ...state, channelModalState: true, channelToEdit: channelId };
  },
  [actions.showRemoveModal](state) {
    return { ...state, removeModalState: true };
  },
  [actions.closeModal](state) {
    return { ...state, channelModalState: false, removeModalState: false };
  },
  [actions.renameChannelSuccess](state) {
    return { ...state, channelModalState: false };
  },
  [actions.removeChannelSuccess](state, { payload: { id } }) {
    const { currentChannelId } = state;
    return {
      ...state,
      removeModalState: false,
      currentChannelId: id === currentChannelId ? 1 : currentChannelId,
    };
  },
}, {});

export default combineReducers({
  chatConnectionState,
  channels,
  messages,
  chatUIState,
  form: formReducer,
});
