import CachedImage from '@/components/CachedImage';
import { navigate } from '@/navigation/utils';
import { Box } from 'native-base';
import React from 'react';
import { Pressable } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';

export type IPuzzleListProps = {};

// https://source.unsplash.com/random/500x500

// https://picsum.photos/500
const PUZZLE_DATA = [
  {
    id: 1,
    image:
      'https://i.picsum.photos/id/392/500/500.jpg?hmac=IDJaWS3UnWgbQkqcGiJloXGZ6AqkAVk8O_ogApmWcIg',
  },
  {
    id: 2,
    image:
      'https://i.picsum.photos/id/1040/500/500.jpg?hmac=bmdEjFeT-uNd51SRuaCY9lKhha5_o8mKmJ5gFTkXBNc',
  },
  {
    id: 3,
    image:
      'https://i.picsum.photos/id/599/500/500.jpg?hmac=BaaKTAEp9i_seZZHXiTgFyyLS_yyGOxzRk-j-JQ81-U',
  },
  {
    id: 4,
    image:
      'https://i.picsum.photos/id/571/500/500.jpg?hmac=QTxKbYmHPeKumvDy4bNH7dxwPz95U-KbT9R5fL0CDgw',
  },
  {
    id: 5,
    image:
      'https://i.picsum.photos/id/268/500/500.jpg?hmac=r-0APcoPbU3x8RzPNFDB1dwGUSl2Uh4ybCV6dEKUvxo',
  },
  {
    id: 6,
    image:
      'https://i.picsum.photos/id/122/500/500.jpg?hmac=u82b4NI-NPVy9aiK8rjtvGzjKHmP63RRugqcYsGwGSY',
  },
  {
    id: 7,
    image:
      'https://i.picsum.photos/id/799/500/500.jpg?hmac=eJ3V8fCr8641MLV-e19_GQ__iRqaCMsugEr9gj8RseQ',
  },
  {
    id: 8,
    image:
      'https://i.picsum.photos/id/547/500/500.jpg?hmac=rhZzPey2iu0a-PB3oKt2rTWHwwSw52CY1038bTQD8JM',
  },

  {
    id: 9,
    image:
      'https://i5.walmartimages.com/asr/6dba292a-e3ef-4819-80e8-221ea83b67a9_1.a9784150095e4834d7b427bc05ff756b.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF',
  },
  {
    id: 10,
    image:
      'https://i.picsum.photos/id/240/1200/1200.jpg?hmac=nejSC79oIDG4dHH_DHdFgQVdq1CpGptUZsU0F9Cd-qQ',
  },
  {
    id: 11,
    image:
      'https://i.picsum.photos/id/254/3000/3000.jpg?hmac=NMzEkG4l_If4lI7dVnn9ceERUKdFqLCAoJjZ9zuc0ZM',
  },
];

const PuzzleList: React.FC<IPuzzleListProps> = () => {
  const size = 200;

  const renderItem = ({ item }: any) => {
    return (
      <Pressable
        style={{
          height: size,
          width: size,
        }}
        onPress={() => navigate('Game', { puzzle: item })}
      >
        <CachedImage source={{ uri: item.image }} style={{ height: '100%', width: '100%' }} />
      </Pressable>
    );
  };

  return (
    <Box flex={1}>
      <FlatGrid
        // spacing={10}
        // itemDimension={itemHeight}
        itemDimension={size}
        data={PUZZLE_DATA}
        renderItem={renderItem}
        style={
          {
            //   height,
            //   width,
            //   paddingTop: 30
          }
        }
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        // optimizations
        // keyExtractor={this._keyExtractor}
        // getItemLayout={this._getItemLayout}
      />
    </Box>
  );
};

export { PuzzleList };
