import stylish from './stylish/stylish.js';
import plain from './plain/plain.js';

export default (formater, data) => {
  switch (formater) {
    case 'stylish':
      return stylish(data);
    case 'plain':
      return plain(data);
    default:
      console.log('no formatter');
      break;
  }
  return null;
};
