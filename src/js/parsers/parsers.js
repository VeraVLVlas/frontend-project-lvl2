import yaml from 'js-yaml';
import { readFileSync } from 'fs';
import path from 'path';

const getFileExtension = (pathFile) => {
  const fileName = pathFile.split('/').pop();
  const fileExtension = path.extname(fileName);
  return [pathFile, fileExtension];
};

export default (fileData) => {
  const [pathFile, fileExtension] = getFileExtension(fileData);

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
