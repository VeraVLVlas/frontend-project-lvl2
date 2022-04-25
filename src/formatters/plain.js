import _ from 'lodash';

const isString = (value) => (typeof value === 'string' ? `'${value}'` : value);

const getFormatAndReturnValue = (value) => (!_.isObject(value) ? isString(value) : '[complex value]');

const plainFormater = (data) => {
  const iter = (value, key) => {
    const result = value.flatMap((elem) => {
      const newKeys = [...key, elem.name];

      switch (elem.type) {
        case 'embedded':
          return iter(elem.children, newKeys);
        case 'no-change':
          return null;
        case 'deleted':
          return `Property '${newKeys.join('.')}' was removed`;
        case 'replacement':
          return `Property '${newKeys.join('.')}' was updated. From ${getFormatAndReturnValue(elem.valueDeleted)} to ${getFormatAndReturnValue(elem.valueAdded)}`;
        case 'added':
          return `Property '${newKeys.join('.')}' was added with value: ${getFormatAndReturnValue(elem.value)}`;
        default:
          throw new Error(`Unknown type ${elem.type}`);
      }
    });

    return result.filter((elem) => elem !== null).join('\n');
  };

  return iter(data, []);
};

export default plainFormater;
