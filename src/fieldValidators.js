const maxMessageLength = 100;
const maxChannelNameLength = 15;
export const maxChannelsCount = 7;

export const normalizeMessage = message => (
  message.length > maxMessageLength
    ? message.slice(0, maxMessageLength)
    : message
);

export const normalizeChannelName = (name) => {
  const onlyLettersAndNumbers = name.replace(/[\W]/g, '');

  return onlyLettersAndNumbers.length > maxChannelNameLength
    ? onlyLettersAndNumbers.slice(0, maxChannelNameLength)
    : onlyLettersAndNumbers;
};

export const validateChannelName = (channelNames, value) => (
  channelNames.includes(value) ? ({ newChannelName: 'This channel name already exists' }) : null
);
