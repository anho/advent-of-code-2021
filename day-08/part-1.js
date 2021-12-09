import { readLines, range } from '../utils.js';

const input = readLines('08/input');
const inputs = input.map(x => x.split(' | '));

const isSame = (a, b) => {
  if (!a || !b) {
    return false;
  }

  if (a.length !== b.length) {
    return false;
  }

  return a.every(x => b.includes(x));
}

const getMappings = (signals) => {
  const numbers = new Array(10);
  signals = signals.map(s => s.split(''));

  numbers[1] = signals.find(s => s.length === 2);
  numbers[4] = signals.find(s => s.length === 4);
  numbers[7] = signals.find(s => s.length === 3);
  numbers[8] = signals.find(s => s.length === 7);

  return numbers;
}

const getOutput = (output, mappings) => {
  const o = output.split(' ')
    .map(x => x.split(''))
    .filter(x => mappings.some(n => isSame(n, x)));

  return o.length;
}

const sum = inputs.reduce(
  (sum, [signal, output]) => {
    const mappings = getMappings(signal.split(' '));
    const o = getOutput(output, mappings);

    return sum + o;
  },
  0
);

console.log(sum);
