import { cwd } from 'process';
import { readFileSync } from 'fs';
import _ from 'lodash';
import path from 'path';

const getSortedKeys = (data) => { // получаем уникальные  ключи
  const keys = [];
  Object.keys(data).forEach((key) => {
    keys.push(key);
  });

  return _.sortBy(keys);
};

const printDiff = (data) => { // печатаем результат
  const result = data.forEach((elem) => console.log(elem));
  return result;
};

const willFormDiff = (file1, file2) => { // формируем дифф
  const parseFile1 = JSON.parse(file1);
  const parseFile2 = JSON.parse(file2);

  const copyData = { ...parseFile1, ...parseFile2 };

  const keys = getSortedKeys(copyData);

  const diffData = ['{'];

  keys.map((key) => {
    if ((_.has(parseFile1, key) &&
         _.has(parseFile2, key) && parseFile1[key] !== parseFile2[key])) {
      diffData.push(` - ${key}:${parseFile1[key]}`);
      diffData.push(` + ${key}:${parseFile2[key]}`);
    } else if ((_.has(parseFile1, key) && _.has(parseFile2, key)
    && parseFile1[key] === parseFile2[key])) {
      diffData.push(`   ${key}:${parseFile1[key]}`);
    } else if ((_.has(parseFile1, key))) {
      diffData.push(` - ${key}:${parseFile1[key]}`);
    } else {
      diffData.push(` + ${key}:${parseFile2[key]}`);
    }
    return diffData;
  });

  diffData.push('}');
  return printDiff(diffData);
};

const readFile = (file1, file2) => { // читаем файл
  const dataFile1 = readFileSync(file1);
  const dataFile2 = readFileSync(file2);
  const diff = willFormDiff(dataFile1, dataFile2);
  console.log(diff);
  return diff;
};

export default (filepath1, filepath2) => { // формируем полный путь до файлов
  const workDir = cwd();
  const filePath1 = path.resolve(workDir, filepath1);
  const filePath2 = path.resolve(workDir, filepath2);
  const result = readFile(filePath1, filePath2);
  return result;
};
