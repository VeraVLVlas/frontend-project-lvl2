import { readFileSync } from 'fs';
import { test, expect, beforeAll } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/js/gen-diff/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf8');

let dataFile1;
let dataFile2;
let result;

beforeAll(() => {
  dataFile1 = getFixturePath('file1.json');
  dataFile2 = getFixturePath('file2.json');
  result = readFile('resultFormaterStylish.txt');
});

test('genDiff stylish', () => {
  expect(genDiff()).toEqual('');
  expect(genDiff(dataFile1, '', 'stylish')).toEqual('');
  expect(genDiff(dataFile1, dataFile2, 'stylish')).toEqual(result);
});
