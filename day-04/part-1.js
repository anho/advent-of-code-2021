import { readLines, chunk, transpose } from '../utils.js';

const input = readLines('04/input');
const numbers = input[0].split(',');
const boards = chunk(input.slice(1), 5).map((board) => board.map(line => line.split(' ').filter(x => x !== '').map(x => ({
  x,
  marked: false
}))));

const markNumber = (n) => boards.forEach((board) => board.forEach(row => row.forEach((cell) => {
  cell.marked = cell.marked || cell.x === n;
})));

const isWinnerBoard = (board) => {
  return board.some(r => r.every(c => c.marked === true)) || transpose(board).some(r => r.every(c => c.marked === true));
}

const { n, winnerBoard } = numbers.reduce(
  (state, n) => {
    if (!!state.winnerBoard) {
      return state;
    }

    markNumber(n)

    return {
      n,
      winnerBoard: boards.find(isWinnerBoard)
    }
  },
  {  winnerBoard: null, n: 0 }
)

const unmarkedSum = winnerBoard.reduce(
  (sum, row) => row.filter(({ marked }) => !marked).reduce((sum, { x, marked }) => sum + Number(x), sum),
  0
);

console.log(unmarkedSum * n);
