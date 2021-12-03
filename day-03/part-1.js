import { range, readLines } from '../utils.js';

const readings = readLines('03/input');

const commonValues = (position) => {
  const [zero, one] = readings.reduce(
    (acc, l) => {
      const x = Number(l.slice(position, position + 1));
      acc[x]++;

      return acc;
    },
    [0, 0]
  );
  return [
    zero > one ? '0' : '1',
    zero > one ? '1' : '0'
  ]
};

const [gamma, epsilon] = range(0, readings[0].length).reduce(
  ([gamma, epsilon], i) => {
    const [mostCommon, leastCommon] = commonValues(i);
    return [gamma + mostCommon, epsilon + leastCommon];
  },
  ['', '']
).map(x => parseInt(x, 2));

console.log(gamma * epsilon);

