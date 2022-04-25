import _ from 'lodash';
import path from 'path';
import { readFileSync } from 'fs';
import parsersFile from './parsers/parsers.js';
import formatterSelection from './formatters/index.js';

const createTree = (arg1, arg2) => {
  const keyArg1 = Object.keys(arg1);
  const keyArg2 = Object.keys(arg2);
  const keys = _.sortBy(_.union(keyArg1, keyArg2));

  const diffData = keys.map((key) => {
    if (!_.has(arg1, key)) {
      return {
        name: key,
        value: arg2[key],
        type: 'added',
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
      valueDeleted: arg1[key],
      valueAdded: arg2[key],
      type: 'replacement',
    };
  });
  return diffData;
};

const getFileExtensionAndReadFile = (pathFile) => {
  const fileExtension = path.extname(pathFile);
  const dataFile = readFileSync(pathFile);
  return [dataFile, fileExtension];
};

const genDiff = (filepath1, filepath2, formater = 'stylish') => {
  const file1 = parsersFile(getFileExtensionAndReadFile(filepath1));
  const file2 = parsersFile(getFileExtensionAndReadFile(filepath2));
  const data = createTree(file1, file2);

  return formatterSelection(formater, data);
};

export default genDiff;
