import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
// import { Text, View } from 'react-native';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { usePuzzleContext } from './PuzzleGameContext';
import { TileMask } from './TileMask';
import { Point, TileObject } from './types';
import { getDistance, randomIntFromInterval } from './utils';

export type ITileProps = {
  tile: TileObject;
};

const SCREEN_HEIGHT = Dimensions.get('window').height;

const highestZIndex: React.MutableRefObject<number | null> = React.createRef();
highestZIndex.current = 1000;

const Tile: React.FC<ITileProps> = ({ tile }) => {
  const { state, onTilePlaced } = usePuzzleContext();
  const initialX = tile.initialPosition.x - state.gridSize.pageOffsetX;
  const intialY = tile.initialPosition.y - state.gridSize.pageOffsetY;
  const translationX = useSharedValue(initialX);
  const translationY = useSharedValue(-SCREEN_HEIGHT);
  const scale = useSharedValue(1);
  const perspective = useSharedValue(1000);
  // const done = state.finishedTiles[tile.id]
  const [done, setDone] = useState(false);

  const [zIndex, setZIndex] = useState(tile.id + 1);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (state.solved) {
      setCorrectPosition();
      setDone(true);
    } else {
      if (!loaded) {
        dropTile();
      }
    }
  }, [state.solved]);

  useEffect(() => {
    if (state.reset) {
      setZIndex(tile.id + 1);
      highestZIndex.current = 1000;
      setDone(false);
      setIntialPosition();
    }
  }, [state.reset]);

  const dropTile = () => {
    setLoaded(true);
    const delay = randomIntFromInterval(50, 600);

    setTimeout(() => {
      // translationX.value = initialX;
      translationY.value = withTiming(intialY, { duration: 650 });
      perspective.value = withTiming(1000, { duration: 650 });
    }, delay);
  };
  //randomIntFromInterval(1, state.tiles.length)
  const setIntialPosition = () => {
    translationX.value = withTiming(tile.initialPosition.x - state.gridSize.pageOffsetX, {
      duration: 650,
    });
    translationY.value = withTiming(tile.initialPosition.y - state.gridSize.pageOffsetY, {
      duration: 650,
    });
  };

  const setCorrectPosition = () => {
    const tileSize = state.tileSize;
    const tilesPerRow = state.gridSize.width / tileSize;
    const i = tile.id;
    const springConfig: Animated.WithSpringConfig = {
      damping: 18,
      mass: 1,
      stiffness: 140,
    };
    translationX.value = withSpring(
      i < tilesPerRow ? tileSize * i : (i % tilesPerRow) * tileSize,
      springConfig,
    );
    translationY.value = withSpring(tileSize * Math.floor(i / tilesPerRow), springConfig);
  };

  const onDrag = (dragging: boolean) => {
    if (dragging) {
      const newIndex = highestZIndex.current + 1;

      setZIndex(newIndex);
      highestZIndex.current = newIndex;
    }

    // setDragging(dragging);
  };

  const checkPosition = (pos: Point) => {
    // ajudsting to check distance between center of the tile to the center of its correct position
    const adjustedPos1 = {
      x: pos.x + state.tileSize / 2,
      y: pos.y + state.tileSize / 2,
    };
    const adjustedPos2 = {
      x: tile.correctPosition.x + state.tileSize / 2,
      y: tile.correctPosition.y + state.tileSize / 2,
    };

    const d = getDistance(adjustedPos1, adjustedPos2);
    // change math here to adjust how sensitive for it to detect if you put the tile in the correct position
    if (Math.abs(d) < state.tileSize / 2) {
      console.log('CORRECT!!!!!');
      setDone(true);
      onTilePlaced(tile);
      setCorrectPosition();
    } else {
      console.log('WRONG!!!');
    }
  };

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { perspective: perspective.value },
        { translateX: translationX.value },
        { translateY: translationY.value },
        // {}
        {
          scale: scale.value,
        },
      ],
    };
  });

  const onPanGestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { x: number; y: number }
  >({
    onStart: (event, ctx) => {
      runOnJS(onDrag)(true);
      scale.value = withTiming(1.1);
      ctx.x = translationX.value;
      ctx.y = translationY.value;
    },
    onActive: (event, ctx) => {
      translationX.value = ctx.x + event.translationX;
      translationY.value = ctx.y + event.translationY;
    },
    onEnd: (e) => {
      const x = e.absoluteX - e.x;
      const y = e.absoluteY - e.y;
      runOnJS(checkPosition)({ x, y });
      runOnJS(onDrag)(false);
      scale.value = withTiming(1);
    },
  });

  // const renderTileNumber = () => {
  //   return (
  //     <View
  //       style={{
  //         position: 'absolute',
  //         alignItems: 'center',
  //         justifyContent: 'center',
  //         height: '100%',
  //         width: '100%',
  //         zIndex: 100000
  //       }}
  //     >
  //       <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{tile.id}</Text>
  //     </View>
  //   );
  // };

  const shadow = {
    shadowColor: 'rgba(0,0,0,0.6)',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 5,
  };

  return (
    <PanGestureHandler onGestureEvent={onPanGestureHandler} enabled={!done}>
      <Animated.View
        style={[
          {
            position: 'absolute',
            zIndex: done ? -10 : zIndex,
          },
          { height: state.tileSize, width: state.tileSize },
          done ? {} : shadow,
          animatedStyles,
        ]}
      >
        {/* {renderTileNumber()} */}
        <TileMask tile={tile} />
      </Animated.View>
    </PanGestureHandler>
  );
};

export { Tile };
