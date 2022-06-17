import { IS_WEB } from '@/utils/Constants';
import React from 'react';
import { View } from 'react-native';
import Svg, { Defs, Path, Image, ClipPath, G } from 'react-native-svg';
import { usePuzzleContext } from './PuzzleGameContext';
import { TileObject } from './types';

export type ITileMaskProps = {
  tile: TileObject;
};

const TileMask: React.FC<ITileMaskProps> = ({ tile }) => {
  const shapeId = `shape_${tile.id}`;
  const { state } = usePuzzleContext();
  const i = tile.id;
  const canvasSize = state.gridSize.height;
  const tilePerRow = Math.sqrt(state.tiles.length);
  const top = Math.floor(i / tilePerRow) * -state.tileSize;
  const left = i < tilePerRow ? -i * state.tileSize : -(i % tilePerRow) * state.tileSize;

  if (IS_WEB) {
    return (
      <View
        style={{
          height: canvasSize,
          width: canvasSize,
          overflow: 'hidden',
          top,
          left,
        }}
        pointerEvents="none"
      >
        <svg height={canvasSize} width={canvasSize}>
          <defs>
            <clipPath id={shapeId}>
              <path
                fill="none"
                d={tile.path}
                fillOpacity={1}
                fill="red"
                stroke="red"
                strokeWidth="1"
              />
            </clipPath>
          </defs>
          <image
            href={state.image}
            width={state.gridSize.width}
            height={state.gridSize.height}
            clipPath={`url(#${shapeId})`}
          />
        </svg>
      </View>
    );
  }
  return (
    <View
      pointerEvents="none"
      style={{
        height: canvasSize,
        width: canvasSize,
        overflow: 'hidden',
        top,
        left,
      }}
    >
      <Svg height={canvasSize} width={canvasSize}>
        <Defs>
          <ClipPath id={shapeId}>
            <Path
              fill="none"
              d={tile.path}
              fillOpacity={1}
              fill="red"
              stroke="red"
              strokeWidth="1"
            />
          </ClipPath>
        </Defs>
        <G clipPath={`url(#${shapeId})`}>
          <Image
            href={{ uri: state.image }}
            preserveAspectRatio="xMidYMid slice"
            width={state.gridSize.width}
            height={state.gridSize.height}
          />
        </G>
      </Svg>
    </View>
  );
};

export { TileMask };
