import stylish from './stylish.js';
import plain from './plain.js';
import jsonFormater from './formater-json.js';

export default (formater, data) => {
  switch (formater) {
    case 'stylish':
      return stylish(data);
    case 'plain':
      return plain(data);
    case 'json':
      return jsonFormater(data);
    default:
      throw new Error(`Unknown formater ${formater}`);
  }
};
