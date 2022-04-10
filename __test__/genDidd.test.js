import { readFileSync } from 'fs';
import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf8');

const dataFile1 = getFixturePath('file1.json');
const dataFile2 = getFixturePath('file2.json');
const resultFormaterStylish = readFile('result-formater-stylish.txt');
const resultFormaterPlain = readFile('result-formater-plain.txt');
const resultFormaterJson = readFile('result-formater-json.txt');

test('formater stylish', () => {
  expect(genDiff(dataFile1, dataFile2, 'stylish')).toEqual(resultFormaterStylish);
});

test('formater plain', () => {
  expect(genDiff(dataFile1, dataFile2, 'plain')).toEqual(resultFormaterPlain);
});

test('formater json', () => {
  expect(genDiff(dataFile1, dataFile2, 'json')).toEqual(resultFormaterJson);
});
