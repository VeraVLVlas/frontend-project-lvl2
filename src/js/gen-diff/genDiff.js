import _ from 'lodash';
import parsersFile from '../parsers/parsers.js';
import stylish from '../stylish/stylish.js';

const createTree = (arg1, arg2) => {
  const keyArg1 = Object.keys(arg1);
  const keyArg2 = Object.keys(arg2);
  const keys = _.sortBy(_.union(keyArg1, keyArg2));

  const diffData = keys.map((key) => {
    if (!_.has(arg1, key)) {
      return {
        name: key,
        value: arg2[key],
        type: 'add',
      };
    }
    if (!_.has(arg2, key)) {
      return {
        name: key,
        value: arg1[key],
        type: 'deleted',
      };
    }
    if (_.isObject(arg1[key]) && _.isObject(arg2[key])) {
      return {
        name: key,
        type: 'embedded',
        children: createTree(arg1[key], arg2[key]),
      };
    }
    if (_.isEqual(arg1[key], arg2[key])) {
      return {
        name: key,
        value: arg1[key],
        type: 'no-change',
      };
    }
    return {
      name: key,
      valueDelete: arg1[key],
      valueAdd: arg2[key],
      type: 'replacement',
    };
  });
  return diffData;
};

export default (filepath1, filepath2, formater) => {
  if (!filepath1 || !filepath2) { return ''; }

  const file1 = parsersFile(filepath1);
  const file2 = parsersFile(filepath2);
  const data = createTree(file1, file2);

  switch (formater) {
    case 'stylish':
      return stylish(data);
    default:
      break;
  }
  return null;
};
