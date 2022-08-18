import React from 'react';
import { Text, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { usePuzzleContext } from './PuzzleGameContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { interpolate } from 'react-native-reanimated';

export type IOptionsCarouselProps = {
  onSnapToItem: (numTiles: number) => void;
};

const NUM_TILE_OPTIONS = [4, 9, 16, 25, 36, 49, 64, 81, 100];

const OptionsCarousel: React.FC<IOptionsCarouselProps> = ({ onSnapToItem }) => {
  const { screenWidth } = usePuzzleContext();

  const featureWidth = screenWidth;

  const animationStyle = React.useCallback((value: number) => {
    'worklet';

    const offset = 90;

    const translateX = interpolate(value, [-1, 0, 1], [-offset, 0, offset]);
    const scale = interpolate(value, [-1, 0, 1], [0.85, 1, 0.85]);

    return {
      transform: [{ translateX }, { scale }],

      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    };
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          height: 100,
          width: 100,
          justifyContent: 'center',
          alignItems: 'center',

          margin: 10,
        }}
      >
        <MaterialCommunityIcons name="puzzle" size={50} color="green" />
        <Text style={{ color: 'white' }}>{item}</Text>
      </View>
    );
  };
  return (
    <Carousel
      width={featureWidth}
      // height={height * 0.4}
      loop={false}
      data={NUM_TILE_OPTIONS}
      renderItem={renderItem}
      onSnapToItem={(index) => onSnapToItem(NUM_TILE_OPTIONS[index])}
      snapEnabled={true}
      customAnimation={animationStyle}
    />
  );
};

export { OptionsCarousel };
