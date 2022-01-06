import { readFileSync } from 'fs';
import { test, expect, beforeAll } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFiles, willFormDiff, getSortedKeys } from '../src/gen-diff/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => JSON.parse(readFileSync(getFixturePath(filename)));

let data;
beforeAll(() => {
  data = readFile('file1.json');
});

test('readFiles', () => {
  expect(readFiles('__fixtures__/file1.json')).toEqual(data);
  expect(readFiles('__fixtures__/file2.json')).toEqual(readFile('file2.json'));
});

test('getSortedKeys', () => {
  expect(getSortedKeys([])).toEqual([]);
  expect(getSortedKeys(data)).toEqual(['follow', 'host', 'proxy', 'task', 'timeout']);
});

test('willFormDiff', () => {
  expect(willFormDiff()).toEqual([]);
  expect(willFormDiff([])).toEqual([]);
  expect(willFormDiff(data)).toEqual([' - follow:false', ' - host:hexlet.io', ' - proxy:123.234.53.22', ' - task:3', ' - timeout:50']);
});
