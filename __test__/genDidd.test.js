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
let resultFormaterStylish;
let resultFormaterPlain;

beforeAll(() => {
  dataFile1 = getFixturePath('file1.json');
  dataFile2 = getFixturePath('file2.json');
  resultFormaterStylish = readFile('result-formater-stylish.txt');
  resultFormaterPlain = readFile('result-formater-plain.txt');
});

test('genDiff stylish', () => {
  expect(genDiff()).toEqual('');
  expect(genDiff(dataFile1, '', 'stylish')).toEqual('');
  expect(genDiff(dataFile1, dataFile2, 'stylish')).toEqual(resultFormaterStylish);
});

test('genDiff plain', () => {
  expect(genDiff()).toEqual('');
  expect(genDiff(dataFile1, '', 'plain')).toEqual('');
  expect(genDiff(dataFile1, dataFile2, 'plain')).toEqual(resultFormaterPlain);
});
