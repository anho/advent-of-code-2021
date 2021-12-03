import { URL } from 'url';
import { readFileSync } from 'fs';

export const readLines = (dayAndType) => {
  const filename = dirname(import.meta.url) + 'day-' + dayAndType + '.txt';
  const content = readFileSync(filename, { encoding: 'utf8' });

  return content
    .split(`\n`)
    .map(l => (l || '').trim())
    .filter(l => l !== '');
}

/**
 *
 * @param importUrl Provide import.meta.url
 */
export const dirname = (importUrl) => {
  return new URL('.', importUrl).pathname;
}

export const window = (size, arr) => {
  return arr.map((_, i) => arr.slice(i, i + size)).filter((x) => x.length === size);
}

export const sum = (arr) => {
  return arr.reduce((sum, x) => sum + x, 0);
}

// https://stackoverflow.com/a/46805290/17252689
export const transpose = (matrix) => {
  return matrix[0].map((col, c) => matrix.map((row, r) => matrix[r][c]));
}

export function range(from, to, inclusive = false) {
  if (to < from) {
    return range(to, from, inclusive).reverse();
  }

  const size = to - from + Number(inclusive);
  return Array.from(new Array(size)).map((_, i) => i + from);
}

export const partition = (arr, predicate) => {
  return arr.reduce(
    (acc, item) => {
      const position = Number(!predicate(item));
      acc[position].push(item);

      return acc;
    },
    [[], []]
  );
}

export const chunk = (arr, size) => {
  const numChunks = Math.ceil(arr.length / size);
  const chunks = range(0, numChunks).reduce(
    (list, i) => [...list, arr.slice(i * size, (i + 1) * size)],
    [],
  );

  return chunks;
}
