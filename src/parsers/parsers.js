import yaml from 'js-yaml';

export default (fileData) => {
  const [dataFile, fileExtension] = fileData;

  switch (fileExtension) {
    case '.yaml':
      return yaml.load(dataFile);
    case '.yml':
      return yaml.load(dataFile);
    case '.json':
      return JSON.parse(dataFile);
    default:
      throw new Error(`Unknown file extension: ${fileExtension}`);
  }
};
