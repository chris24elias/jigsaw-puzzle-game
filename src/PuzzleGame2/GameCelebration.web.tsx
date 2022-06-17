import React from 'react';
import { View } from 'react-native';

import { usePuzzleContext } from './PuzzleGameContext';

export type IGameCelebrationProps = {};

const GameCelebration: React.FC<IGameCelebrationProps> = () => {
  const { state } = usePuzzleContext();
  if (!state.solved) {
    return null;
  }

  return (
    <View
      style={{ position: 'absolute', height: '100%', width: '100%', zIndex: 1000 }}
      pointerEvents="none"
    >
      {/* <LottieView
        autoPlay={true}
        loop={false}
        style={{
          //   height: screenHeight,
          //   width: screenWidth
          transform: [{ scale: 1.3 }]
        }}
        // onAnimationFinish={onFinishedCelebrating}
        source={require('./celebration3.json')}
      />
      <LottieView
        autoPlay={true}
        loop={false}
        style={{
          //   height: screenHeight,
          //   width: screenWidth
          transform: [{ scale: 1.1 }]
        }}
        // onAnimationFinish={onFinishedCelebrating}
        source={require('./celebration.json')}
      /> */}
    </View>
  );
};

export { GameCelebration };
