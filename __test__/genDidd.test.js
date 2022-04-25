import { readFileSync } from 'fs';
import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf8');

const dataFileJson1 = getFixturePath('file1.json');
const dataFileJson2 = getFixturePath('file2.json');
const dataFile1Yaml1 = getFixturePath('file3.yaml');
const dataFileYaml2 = getFixturePath('file4.yml');
const resultFormaterStylish = readFile('result-formater-stylish.txt');
const resultFormaterPlain = readFile('result-formater-plain.txt');
const resultFormaterJson = readFile('result-formater-json.txt');
const fileFormats = [['stylish', resultFormaterStylish], ['plain', resultFormaterPlain], ['json', resultFormaterJson]];

test.each(fileFormats)('formater %s, file extension json', (format, expected) => {
  expect(genDiff(dataFileJson1, dataFileJson2, format)).toEqual(expected);
});

test.each(fileFormats)('formater %s, file extension yaml', (format, expected) => {
  expect(genDiff(dataFile1Yaml1, dataFileYaml2, format)).toEqual(expected);
});
