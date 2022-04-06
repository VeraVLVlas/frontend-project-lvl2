import _ from 'lodash';

const checkElementNesting = (arg) => (!_.isObject(arg) ? arg : '[complex value]');

const plainFormater = (data) => {
  const iter = (arg, key) => {
    const result = arg.flatMap((elem) => {
      const newKeys = [...key, elem.name];

      switch (elem.type) {
        case 'embedded':
          return iter(elem.children, newKeys);
        case 'no-change':
          return null;
        case 'deleted':
          return `Property '${newKeys.join('.')}' was removed`;
        case 'replacement':
          return `Property '${newKeys.join('.')}' was updated. From '${checkElementNesting(elem.valueDelete)}' to '${checkElementNesting(elem.valueAdd)}'`;
        case 'add':
          return `Property '${newKeys.join('.')}' was added with value: '${checkElementNesting(elem.value)}'`;
        default:
          break;
      }
      return null;
    });

    return result.filter((elem) => elem !== null).join('\n');
  };

  return iter(data, []);
};

export default plainFormater;
