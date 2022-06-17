import { Image } from 'react-native';
import { Point, Size } from './types';

export const getImageSize = (uri: string): Promise<Size> =>
  new Promise((resolve, reject) =>
    Image.getSize(uri, (width, height) => resolve({ width, height }), reject)
  );

export const getDistance = (pointA: Point, pointB: Point) => {
  const { x: x1, y: y1 } = pointA;

  const { x: x2, y: y2 } = pointB;

  const a = x1 - x2;
  const b = y1 - y2;

  const c = Math.sqrt(a * a + b * b);
  return c;
};

export function randomIntFromInterval(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}
