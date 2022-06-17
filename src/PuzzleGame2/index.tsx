import React from 'react';
import PuzzleContextProvider from './PuzzleGameContext';
import { PuzzleView } from './PuzzleView';

export type IPuzzleGame2Props = {};

const PuzzleGame2: React.FC<IPuzzleGame2Props> = ({ route }) => {
  const { puzzle } = route.params || {};

  return (
    <PuzzleContextProvider puzzle={puzzle}>
      <PuzzleView />
    </PuzzleContextProvider>
  );
};

export { PuzzleGame2 };
