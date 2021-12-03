import { readLines, range } from '../utils.js';

const input = readLines('05/input');
const lines = input.map(l => l.split(' -> ').map(coordinates => coordinates.split(',').map(Number)));

const getCoordinates = ([from, to]) => {
  const [fromX, fromY] = from;
  const [toX, toY] = to;

  if (fromY === toY) {
    return range(fromX, toX, true).map(x => [x, fromY]);
  }

  if (fromX === toX) {
    return range(fromY, toY, true).map(y => [fromX, y]);
  }

  const multiplierY = fromY < toY ? 1 : -1;

  return range(fromX, toX, true).map(x => [x, fromY + (Math.abs(fromX - x) * multiplierY)]);
};

const gteTwo = lines
  .map(getCoordinates)
  .flat()
  .reduce(
    (diagram, [x,y]) => {
      diagram[x] = diagram[x] ?? [];
      diagram[x][y] = (diagram[x][y] ?? 0) + 1;

      return diagram;
    },
    []
  )
  .flat()
  .filter(x => x >= 2)

console.log(gteTwo.length);
