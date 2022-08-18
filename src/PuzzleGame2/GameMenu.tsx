import React, { useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { OptionsCarousel } from './OptionsCarousel';
import { usePuzzleContext } from './PuzzleGameContext';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Box, Button, Text } from 'native-base';

export type IGameMenuProps = {};

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

const GameMenu: React.FC<IGameMenuProps> = () => {
  const { screenHeight, screenWidth, loadGame, state, setNumTiles } = usePuzzleContext();

  // const imgSize = Device.isPhone ? screenWidth * 0.8 : screenWidth * 0.3;
  const imgSize = screenWidth * 0.8;

  const y = useSharedValue(0);
  const opacity = useSharedValue(1);

  useEffect(() => {
    y.value = withTiming(state.loading ? 0 : screenHeight, { duration: 650 });
    opacity.value = withTiming(state.loading ? 1 : 0);
  }, [state.loading]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: y.value }],
    };
  });

  const opacityStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    <>
      <AnimatedBlurView
        pointerEvents={'none'}
        // tint="dark"
        intensity={15}
        style={[
          {
            ...StyleSheet.absoluteFillObject,
            zIndex: -100,
            backgroundColor: 'rgba(0,0,0,0.2)',
          },
          opacityStyle,
        ]}
      />
      <Animated.View
        style={[
          {
            position: 'absolute',
            // height: Device.isPhone ? screenHeight * 0.8 : screenHeight * 0.8,
            // width: Device.isPhone ? screenWidth * 0.9 : screenWidth * 0.35,
            height: screenHeight * 0.8,
            width: screenWidth * 0.9,
            borderRadius: 12,
            backgroundColor: 'rgba(47, 53, 66, 0.9)',
            shadowColor: 'rgba(0,0,0,0.6)',
            shadowOffset: { width: 2, height: 2 },
            shadowOpacity: 1,
            shadowRadius: 5,
            // padding: 25,
            zIndex: 1000000000,
            // justifyContent: 'center',
            // alignItems: 'center'
          },
          animatedStyle,
        ]}
      >
        <Box flex={1} overflow="hidden" p="6">
          <Box flex={1}>
            <Image
              source={{ uri: state.image }}
              style={{ height: imgSize, width: imgSize, alignSelf: 'center', borderRadius: 12 }}
            />
          </Box>

          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ marginVertical: 20 }}>
              <Text style={{ color: 'white', fontSize: 20 }}>Select Number of Tiles</Text>
            </View>

            <Box flex={0.5} mb="4">
              <OptionsCarousel onSnapToItem={(num) => setNumTiles(num)} />
            </Box>

            <Button onPress={loadGame}>
              <Text>Start</Text>
            </Button>
          </View>
        </Box>
      </Animated.View>
    </>
  );
};

export { GameMenu };
