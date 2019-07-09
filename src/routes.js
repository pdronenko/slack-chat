const host = 'api/v1';

export default {
  channelsPath: () => [host, 'channels'].join('/'),
  messagesPath: channelId => [host, 'channels', channelId, 'messages'].join('/'),
  channelPath: channelId => [host, 'channels', channelId].join('/'),
};
