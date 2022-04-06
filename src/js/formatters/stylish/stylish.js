import _ from 'lodash';

const DEPTH_INCREASE = 1;
const DEPTH_REDUCTION = 2;
const INDENT_SIZE = 4;

const addsIndentation = (arg) => ' '.repeat(arg);

const getNestedElem = (arg, depth) => {
  if (!_.isObject(arg)) { return `${arg}`; }

  const indents = depth * INDENT_SIZE;
  const closeIndents = (depth - DEPTH_INCREASE) * INDENT_SIZE;

  const internalData = Object
    .entries(arg)
    .map(([key, val]) => `${addsIndentation(indents)}${key}: ${getNestedElem(val, depth + DEPTH_INCREASE)}`);

  return `{\n${internalData.join('\n')}\n${addsIndentation(closeIndents)}}`;
};

const stylish = (diff) => {
  const iter = (arg, depth) => {
    const indentSize = depth * INDENT_SIZE;

    const result = arg.map((elem) => {
      switch (elem.type) {
        case 'embedded':
          return `${addsIndentation(depth * INDENT_SIZE)}${elem.name}: {\n${iter(elem.children, depth + DEPTH_INCREASE)}\n${addsIndentation(depth * INDENT_SIZE)}}`;
        case 'add':
          return `${addsIndentation(indentSize - DEPTH_REDUCTION)}+ ${elem.name}: ${getNestedElem(elem.value, depth + DEPTH_INCREASE)}`;
        case 'deleted':
          return `${addsIndentation(indentSize - DEPTH_REDUCTION)}- ${elem.name}: ${getNestedElem(elem.value, depth + DEPTH_INCREASE)}`;
        case 'no-change':
          return `${addsIndentation(indentSize)}${elem.name}: ${getNestedElem(elem.value, depth + DEPTH_INCREASE)}`;
        case 'replacement':
          return (
            `${addsIndentation(indentSize - DEPTH_REDUCTION)}- ${elem.name}: ${getNestedElem(elem.valueDelete, depth + DEPTH_INCREASE)}\n${addsIndentation(indentSize - DEPTH_REDUCTION)}+ ${elem.name}: ${getNestedElem(elem.valueAdd, depth + DEPTH_INCREASE)}`);
        default:
          break;
      }
      return null;
    });

    return result.join('\n');
  };

  return `{\n${(iter(diff, DEPTH_INCREASE))}\n}`;
};

export default stylish;
