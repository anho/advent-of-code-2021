import { readLines, range } from '../utils.js';

const input = readLines('09/input');
const width = input[0].length;
const heatmap = input.map(l => l.split('').map(Number)).flat();

const isLow = (pos) => {
  const x = heatmap[pos];
  const neighbours = [heatmap[pos - 1], heatmap[pos + 1], heatmap[pos - width], heatmap[pos + width]].filter(x => x !== undefined);

  return neighbours.every(y => x < y);
};

const riskLevel = heatmap.reduce(
  (sum, x, pos) => sum + (isLow(pos) ? 1 + x : 0),
  0
);

console.log(riskLevel);
