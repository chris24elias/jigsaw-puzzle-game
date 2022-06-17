import useSetState from '@/hooks/useSetState';
import { JigsawGenerator } from './PuzzleGenerator/puzzle-generator';
import React from 'react';
import { useWindowDimensions } from 'react-native';
import { Size, TileObject, ViewLayout } from './types';
import { getImageSize, randomIntFromInterval } from './utils';

export type PuzzleContextProviderProps = {
  puzzle: { image: string; id: number };
};

type State = {
  loading: boolean;
  image: any;
  imageSize: Size;
  canvas: Size;
  tiles: TileObject[];
  tileSize: number;
  gridSize: ViewLayout;
  solved: boolean;
  numTiles: number;
  finishedTiles: any;
  reset: number;
};

type PuzzleContextProps = {
  state: State;
  loadGame: () => void;
  solve: () => void;
  reset: () => void;
  screenHeight: number;
  screenWidth: number;
  setNumTiles: (num: number) => void;
  setViewDimensions: (viewDimension: ViewLayout) => void;
  onTilePlaced: (tile: TileObject) => void;
};

export const PuzzleContext = React.createContext<PuzzleContextProps>();

const PuzzleContextProvider: React.FC<PuzzleContextProviderProps> = ({ children, puzzle }) => {
  const { height: screenHeight, width: screenWidth } = useWindowDimensions();

  const getInitialCanvas = () => {
    let size = 250;

    // if (Device.isPhone) {
    size = screenWidth * 0.7;
    // }

    // if (Device.isTablet || Device.isWeb) {
    //   size = screenHeight * 0.6;
    // }

    const adjustedSize = Math.round(Math.floor(size) / 100) * 100;
    return { height: adjustedSize, width: adjustedSize };
  };

  const [state, setState] = useSetState<State>({
    loading: true,
    image: puzzle.image,
    imageSize: { height: 0, width: 0 },
    canvas: getInitialCanvas(),
    tiles: [],
    tileSize: 0,
    gridSize: {
      height: 0,
      width: 0,
      frameOffsetX: 0,
      frameOffsetY: 0,
      pageOffsetY: 0,
      pageOffsetX: 0,
    },
    solved: false,
    numTiles: 4,
    finishedTiles: {},
    reset: 0,
  });

  const loadGame = () => {
    createPieces();
  };

  const createPieces = async () => {
    try {
      const dimensions = state.gridSize;
      const numTiles = state.numTiles;
      const imageSize = await getImageSize(state.image);

      const canvasWidth = dimensions.width;
      const canvasHeight = dimensions.height;
      // const numTiles = 16;
      const xCount = Math.sqrt(numTiles);
      const yCount = Math.sqrt(numTiles);
      const tileSize = canvasWidth / xCount;

      const SvgPaths = new JigsawGenerator({
        width: canvasWidth,
        height: canvasHeight,
        xCount: xCount,
        yCount: yCount,
        radius: 0, // Math.min(width / _xc, height / _yc) / 5,
        fixedPattern: false,
      }).toSvgElements();

      const tiles = [];
      for (let i = 0; i < numTiles; i++) {
        // const tileWidth = itemHeight;
        // const tileHeight = itemHeight;

        const path = SvgPaths[i];

        const newTile: TileObject = {
          id: i,
          top: -Math.floor(i / xCount) * tileSize,
          left: i < xCount ? -i * tileSize : -(i % xCount) * tileSize,
          correctPosition: {
            x:
              i < xCount
                ? dimensions.pageOffsetX + tileSize * i
                : dimensions.pageOffsetX + (i % xCount) * tileSize,

            y: dimensions.pageOffsetY + tileSize * Math.floor(i / xCount),
          },

          initialPosition: getRandomPosition(i, dimensions, tileSize),
          path,
        };
        tiles.push(newTile);
      }

      // randomize array
      // shuffle(tiles);

      setState({
        solved: false,
        finishedTiles: {},
        loading: false,
        imageSize,
        tiles,
        tileSize,
        gridSize: { ...dimensions },
        reset: 0,
      });
    } catch (error) {
      // log error
      console.log('ERROR', error);
    }
  };

  const getRandomPosition = (i, dimensions: ViewLayout, tileSize: number) => {
    let x = 0;
    let y = 0;
    const padding = 15;
    // const randomSide = Device.isPhone ? randomIntFromInterval(0, 1) : randomIntFromInterval(0, 3);
    const randomSide = randomIntFromInterval(0, 1);

    switch (randomSide) {
      //top
      case 0:
        x = randomIntFromInterval(padding, screenWidth - tileSize - padding);
        y = randomIntFromInterval(padding, dimensions.pageOffsetY - tileSize - padding);
        break;
      //bottom
      case 1:
        x = randomIntFromInterval(padding, screenWidth - tileSize - padding);
        y = randomIntFromInterval(
          dimensions.pageOffsetY + dimensions.height + padding,
          screenHeight - tileSize - padding,
        );
        break;
      // left
      case 2:
        x = randomIntFromInterval(padding, dimensions.pageOffsetX - tileSize - padding);
        y = randomIntFromInterval(padding, screenHeight - tileSize - padding);
        break;
      // right
      case 3:
        x = randomIntFromInterval(
          dimensions.pageOffsetX + dimensions.width + padding,
          screenWidth - tileSize - padding,
        );
        y = randomIntFromInterval(padding, screenHeight - tileSize - padding);
        break;
    }

    return { x, y };
  };

  const onTilePlaced = (tile: TileObject) => {
    const finishedTiles = state.finishedTiles;
    finishedTiles[tile.id] = true;

    if (Object.keys(finishedTiles).length === state.tiles.length) {
      // finished?? this is probably bad logic but oh well

      setState({
        finishedTiles,
        solved: true,
      });
    }
  };

  const solve = () => {
    setState({
      solved: true,
    });
  };

  const reset = () => {
    // just a hack for now... this wont stay
    // if (!state.solved) {
    //   setState({
    //     solved: true
    //   });
    //   setTimeout(() => {
    //     setState({
    //       solved: false
    //     });
    //   }, 200);
    // } else {
    //   setState({
    //     solved: false
    //   });
    // }
    loadGame();
    setState({
      reset: state.reset + 1,
    });
  };

  const setViewDimensions = (viewLayout: ViewLayout) => {
    setState({
      gridSize: viewLayout,
    });
  };

  const setNumTiles = (num: number) => {
    console.log('setting num tiles', num);
    setState({
      numTiles: num,
    });
  };

  return (
    <PuzzleContext.Provider
      value={{
        state,
        loadGame,
        solve,
        reset,
        screenHeight,
        screenWidth,
        setNumTiles,
        setViewDimensions,
        onTilePlaced,
      }}
    >
      {children}
    </PuzzleContext.Provider>
  );
};

export const usePuzzleContext = () => React.useContext(PuzzleContext);

export default PuzzleContextProvider;
