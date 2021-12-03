import { partition, range, readLines } from '../utils.js';

const readings = readLines('03/input');

const commonValues = (arr, position) => {
  if (arr.length === 1) {
    return [arr, arr];
  }

  const [zero, one] = partition(arr, (l) => l.slice(position, position + 1) === '0');
  const zeroLength = zero.length;
  const oneLength = one.length;

  return [
    oneLength > zeroLength ? one : zero,
    zeroLength < oneLength ? zero : one,
  ]
};

const [oxygen, co2] = range(0, readings[0].length).reduce(
  ([oxygen, co2], i) => {
    return [commonValues(oxygen, i)[0], commonValues(co2, i)[1]];
  },
  [readings, readings]
).map(([x]) => parseInt(x, 2));

console.log(oxygen * co2);
