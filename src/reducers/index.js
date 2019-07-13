import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { handleActions } from 'redux-actions';
import concat from 'lodash/concat';
import omitBy from 'lodash/omitBy';
import * as actions from '../actions';

const socketConnectionState = handleActions({
  [actions.disconnectSocket]() {
    return 'disconnected';
  },
  [actions.connectSocket]() {
    return 'connected';
  },
}, 'idle');

const messagesFetchingState = handleActions({
  [actions.fetchMessagesRequest]() {
    return 'requested';
  },
  [actions.fetchMessagesFailure]() {
    return 'failed';
  },
  [actions.fetchMessagesSuccess]() {
    return 'finished';
  },
}, 'finished');

const channels = handleActions({
  [actions.addChannelSuccess](state, { payload: { newChannel } }) {
    const { allIds, byId } = state;
    const { id } = newChannel;
    return {
      allIds: [...allIds, id],
      byId: { ...byId, [id]: newChannel },
    };
  },
  [actions.renameChannelSuccess](state, { payload: { renamedChannel } }) {
    const { byId, allIds } = state;
    const { id } = renamedChannel;
    return {
      allIds,
      byId: { ...byId, [id]: renamedChannel },
    };
  },
  [actions.removeChannelSuccess](state, { payload: { id } }) {
    const { allIds, byId } = state;
    return {
      allIds: allIds.filter(chId => chId !== id),
      byId: omitBy(byId, ch => ch.id === id),
    };
  },
}, {});

const messages = handleActions({
  [actions.fetchMessagesSuccess](state, { payload: { messagesList, currentChannelId } }) {
    return { ...state, [currentChannelId]: messagesList };
  },
  [actions.addMessageSuccess](state, { payload: { message } }) {
    const { channelId } = message;
    return { ...state, [channelId]: concat(state[channelId], message) };
  },
}, {});

const chatUIState = handleActions({
  [actions.changeChannel](state, { payload: { channelId } }) {
    return { ...state, currentChannelId: channelId };
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
  socketConnectionState,
  messagesFetchingState,
  channels,
  messages,
  chatUIState,
  form: formReducer,
});
