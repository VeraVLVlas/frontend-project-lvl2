import { cwd } from 'process';
import { readFileSync } from 'fs';
import _ from 'lodash';
import path from 'path';

const getSortedKeys = (data) => {
  const keys = Object.keys(data).map((key) => key);

  return _.sortBy(keys);
};

const printDiff = (data) => {
  console.log('{');
  data.map((elem) => console.log(elem));
  console.log('}');
};

const willFormDiff = (file1, file2) => {
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

const readFiles = (pathFile) => {
  const workDir = cwd();
  const filePath = path.resolve(workDir, pathFile);
  const data = readFileSync(filePath);

  return JSON.parse(data);
};

export default (filepath1, filepath2) => {
  const file1 = readFiles(filepath1);
  const file2 = readFiles(filepath2);
  const diff = willFormDiff(file1, file2);

  return printDiff(diff);
};

export {
  readFiles,
  willFormDiff,
  getSortedKeys,
};
