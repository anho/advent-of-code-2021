import { readLines, range } from '../utils.js';

const input = readLines('06/input');
const ages = input[0].split(',').map(Number);

const buckets = ages.reduce(
  (arr, age) => {
    arr[age]++;
    return arr;
  },
  new Array(9).fill(0)
)

for (const i of range(1, 256, true)) {
  [...buckets].forEach((count, i) => {
    if (i === 0) {
      buckets[0] -= count;
      buckets[8] += count;
      buckets[6] += count;
    } else {
      buckets[i] -= count;
      buckets[i - 1] += count;
    }
  });
}

const numFishes = buckets.reduce((sum, numFishes) => sum + numFishes, 0);

console.log(numFishes);
