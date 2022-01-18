import _ from 'lodash';
import parsersFile from '../parsers/parsers.js';

const getSortedKeys = (data) => {
  const keys = Object.keys(data).map((key) => key);
  return _.sortBy(keys);
};

const willFormDiff = (data) => {
  const result = data.map((elem) => elem);
  return `{\n${result.join('\n')} \n}`;
};

const processesData = (file1, file2) => {
  const copyData = { ...file1, ...file2 };

  const keys = getSortedKeys(copyData);

  const diffData = keys.map((key) => {
    if ((_.has(file1, key)
    && _.has(file2, key) && file1[key] !== file2[key])) {
      return ([
        ` - ${key}:${file1[key]}`,
        ` + ${key}:${file2[key]}`,
      ]);
    } if ((_.has(file1, key) && _.has(file2, key)
    && file1[key] === file2[key])) {
      return `   ${key}:${file1[key]}`;
    } if ((_.has(file1, key))) {
      return ` - ${key}:${file1[key]}`;
    }
    return ` + ${key}:${file2[key]}`;
  });

  return diffData.flat();
};

export default (filepath1, filepath2) => {
  const file1 = parsersFile(filepath1);
  const file2 = parsersFile(filepath2);
  const diff = processesData(file1, file2);

  return willFormDiff(diff);
};

export {
  processesData,
  getSortedKeys,
};
