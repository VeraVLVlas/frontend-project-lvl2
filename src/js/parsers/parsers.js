import yaml from 'js-yaml';
import { readFileSync } from 'fs';
import path from 'path';

const getFileExtension = (pathFile) => path.extname(pathFile);

export default (pathFile) => {
  const fileExtension = getFileExtension(pathFile);

  switch (fileExtension) {
    case '.yaml':
      return yaml.load(readFileSync(pathFile, 'utf8'));
    case '.yml':
      return yaml.load(readFileSync(pathFile, 'utf8'));
    case '.json':
      return JSON.parse(readFileSync(pathFile));
    default:
      console.error('unknown file extension passed');
  }

  return null;
};

export { getFileExtension };
