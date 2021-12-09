import { readLines } from '../utils.js';

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

// x are in A & B
const intersection = (a, b) => {
  return a.filter(x => b.includes(x)).length;
}

const getMappings = (signals) => {
  const numbers = new Array(10);
  signals = signals.map(s => s.split(''));

  numbers[1] = signals.find(s => s.length === 2);
  numbers[4] = signals.find(s => s.length === 4);
  numbers[7] = signals.find(s => s.length === 3);
  numbers[8] = signals.find(s => s.length === 7);

  numbers[3] = signals.find(s => s.length === 5 && intersection(s, numbers[1]) === 2);
  numbers[2] = signals.find(s => s.length === 5 && intersection(s, numbers[3]) === 4 && intersection(s, numbers[4]) === 2);
  numbers[5] = signals.find(s => s.length === 5 && s !== numbers[2] && s !== numbers[3]);

  numbers[0] = signals.find(s => s.length === 6 && intersection(s, numbers[1]) === 2 && intersection(s, numbers[2]) === 4 && intersection(s, numbers[3]) === 4);
  numbers[9] = signals.find(s => s.length === 6 && intersection(s, numbers[1]) === 2 && s !== numbers[0]);
  numbers[6] = signals.find(s => s.length === 6 && s !== numbers[9] && s !== numbers[0]);

  return numbers;
}

const getOutput = (output, mappings) => {
  const o = output.split(' ')
    .map(x => x.split(''))
    .map(x => mappings.findIndex(n => isSame(n, x)))
    .join('');

  return Number(o);
}

const sum = inputs.reduce(
  (sum, [signal, output]) => {
    const mappings = getMappings(signal.split(' '));
    const o = getOutput(output, mappings);

    return sum + o;
  },
  0
)

console.log(sum);
