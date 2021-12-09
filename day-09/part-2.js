import { readLines, range } from '../utils.js';

const input = readLines('09/input');
const width = input[0].length;
const heatmap = input.map(l => l.split('').map(Number)).flat();

const getNeighbours = (pos) => {
  const positions = [pos - 1, pos + 1, pos - width, pos + width,].filter(x => x >= 0 && x <= heatmap.length - 1);
  const neighbours = positions.map(x => [x, heatmap[x]]);

  return neighbours;
};

const isLow = (pos) => {
  const x = heatmap[pos];
  const neighbours = getNeighbours(pos);

  return neighbours.every(([, y]) => x < y);
};

const getBasin = ([pos, x], acc = new Set([pos])) => {
  const neighbours = getNeighbours(pos).filter(([, y]) => y > x && y !== 9);
  const positions = new Set([...acc, ...neighbours.map(([nPos]) => nPos)]);
  const ofNeighbours = neighbours.map(
    (n) => getBasin(n, )
  );

  return Array.from(new Set([
    ...acc,
    ...ofNeighbours
  ].flat()));
}

const theResult = heatmap
  .reduce(
    (list, x, pos) => isLow(pos) ? [...list, [pos, x]] : list,
    []
  )
  .reduce(
    (lengths, point) => [...lengths, getBasin(point).length],
    []
  )
  .sort((a, b) => b - a)
  .slice(0, 3)
  .reduce(
    (product, x) => product * x,
    1
  )

console.log(theResult);
