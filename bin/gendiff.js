#!/usr/bin/env node

import program from 'commander';
import genDiff from '../src/gen-diff/genDiff.js';

program
  .description('Compares two configuration files and shows a difference.')
  .option(' ')
  .version('0.0.1')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => {
    genDiff(filepath1, filepath2);
  })
  .parse();
