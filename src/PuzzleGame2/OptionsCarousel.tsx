import React from 'react';
import { Text, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { usePuzzleContext } from './PuzzleGameContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export type IOptionsCarouselProps = {
  onSnapToItem: (numTiles: number) => void;
};

const NUM_TILE_OPTIONS = [4, 9, 16, 25, 36, 49, 64, 81, 100];

const OptionsCarousel: React.FC<IOptionsCarouselProps> = ({ onSnapToItem }) => {
  const { screenWidth } = usePuzzleContext();

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
    // <Carousel
    //   // ref={(c) => { this._carousel = c; }}
    //   data={NUM_TILE_OPTIONS}
    //   onSnapToItem={(index) => onSnapToItem(NUM_TILE_OPTIONS[index])}
    //   renderItem={({ item }) => {
    //     return (
    //       <View
    //         style={{
    //           height: 100,
    //           width: 100,
    //           justifyContent: 'center',
    //           alignItems: 'center',

    //           margin: 10
    //         }}
    //       >
    //         <MaterialCommunityIcons name="puzzle" size={50} color="green" />

    //         <Text style={{ color: 'white' }}>{item}</Text>
    //       </View>
    //     );
    //   }}
    //   sliderWidth={Device.isPhone ? screenWidth * 0.9 : screenWidth * 0.35}
    //   itemWidth={100}
    //   itemHeight={100}
    //   slideStyle={{
    //     justifyContent: 'center',
    //     alignItems: 'center'
    //   }}
    //   inactiveSlideOpacity={0.6}
    //   inactiveSlideScale={0.8}
    // />
    <Carousel
      width={screenWidth}
      // height={height * 0.4}
      data={NUM_TILE_OPTIONS}
      renderItem={renderItem}
      onSnapToItem={(index) => onSnapToItem(NUM_TILE_OPTIONS[index])}
      snapEnabled={true}
    />
  );
};

export { OptionsCarousel };
