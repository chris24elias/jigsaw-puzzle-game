import { goBack } from '@/navigation/utils';
import React, { useEffect, useRef } from 'react';
import { Pressable, Text, View } from 'react-native';
import { usePuzzleContext } from './PuzzleGameContext';
import { Tile } from './Tile';
import { GameMenu } from './GameMenu';
import { GameCelebration } from './GameCelebration';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Icon } from 'native-base';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export type IPuzzleViewProps = {};

const PuzzleView: React.FC<IPuzzleViewProps> = () => {
  const { state, solve, reset, setViewDimensions, screenHeight, screenWidth } = usePuzzleContext();
  const { tiles } = state;

  const viewRef = useRef<View>(null);

  const rotateX = useSharedValue(0);
  const scale = useSharedValue(1.5);
  const timingConfig = {
    duration: 800,
  };

  useEffect(() => {
    if (!state.loading) {
      setTiltedPosition();
    }
  }, [state.loading]);

  useEffect(() => {
    if (state.solved) {
      setIntialPosition();
    } else if (!state.loading && !state.solved) {
      setTiltedPosition();
    }
  }, [state.solved]);

  const setIntialPosition = () => {
    rotateX.value = withTiming(0, timingConfig);
    // scale.value = withTiming(Device.isPhone ? 1.2 : 1.5, timingConfig);
    scale.value = withTiming(1.2, timingConfig);
  };

  const setTiltedPosition = () => {
    rotateX.value = withTiming(15, timingConfig);
    scale.value = withTiming(1, timingConfig);
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { perspective: 1000 },
        { rotateX: `${rotateX.value}deg` },
        { scale: scale.value },
      ],
    };
  });

  const animatedBackgroundStyle = useAnimatedStyle(() => {
    return {
      zIndex: -100000,
      transform: [
        { perspective: 1000 },
        { rotateX: `${rotateX.value}deg` },
        { translateY: -50 },
        { scale: scale.value },
      ],
    };
  });

  const onLayout = () => {
    viewRef.current?.measure(
      (frameOffsetX, frameOffsetY, width, height, pageOffsetX, pageOffsetY) => {
        setViewDimensions({
          frameOffsetX,
          frameOffsetY,
          width,
          height,
          pageOffsetX,
          pageOffsetY,
        });
      },
    );
  };

  const renderGame = () => {
    return (
      <Animated.View
        style={[
          {
            flex: 1,
            backgroundColor: 'rgba(255,255,255,0.3)',
            shadowColor: 'rgba(0,0,0,0.6)',
            shadowOffset: { width: 2, height: 2 },
            shadowOpacity: 1,
            shadowRadius: 5,
          },
          animatedStyle,
        ]}
      >
        {tiles.map((tile) => {
          return <Tile tile={tile} key={`tile_${tile.id}`} />;
        })}
      </Animated.View>
    );
  };

  return (
    <View style={{ flex: 1, overflow: 'hidden' }}>
      <Animated.Image
        source={require('./table.jpeg')}
        style={[
          {
            position: 'absolute',
            zIndex: -1000,
            height: screenHeight * 1.3,
            width: screenWidth * 1.3,
            top: -screenHeight * 0.3,
            left: -screenWidth * 0.2,
          },
          animatedBackgroundStyle,
        ]}
      />
      <Pressable
        style={{
          position: 'absolute',
          top: 50,
          left: 15,
          zIndex: 100,
        }}
        onPress={() => goBack()}
      >
        {/* <Text style={{ color: 'white', fontSize: 22, fontWeight: 'bold' }}>BACK</Text> */}
        <Icon name="chevron-left" as={FontAwesome} size={6} color="white" />
      </Pressable>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View
          style={{
            position: 'absolute',
            flexDirection: 'row',
            right: 15,
            top: 50,
            zIndex: 100000000,
          }}
        >
          <Pressable onPress={solve}>
            <Text style={{ color: 'white', fontSize: 22, fontWeight: 'bold', marginRight: 15 }}>
              SOLVE
            </Text>
          </Pressable>
          <Pressable onPress={reset}>
            <Text style={{ color: 'white', fontSize: 22, fontWeight: 'bold' }}>RESET</Text>
          </Pressable>
        </View>
        <GameMenu />
        <GameCelebration />
        <View
          ref={viewRef}
          onLayout={onLayout}
          style={{
            ...state.canvas,
          }}
        >
          {!state.loading && renderGame()}
        </View>
      </View>
    </View>
  );
};

export { PuzzleView };
