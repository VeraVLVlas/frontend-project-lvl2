import yaml from 'js-yaml';
import { readFileSync } from 'fs';

export default (fileData) => {
  const [pathFile, fileExtension] = fileData;

  switch (fileExtension) {
    case '.yaml':
      return yaml.load(readFileSync(pathFile, 'utf8'));
    case '.yml':
      return yaml.load(readFileSync(pathFile, 'utf8'));
    case '.json':
      return JSON.parse(readFileSync(pathFile));
    default:
      throw new Error(`Unknown file extension: ${fileExtension}`);
  }
};
