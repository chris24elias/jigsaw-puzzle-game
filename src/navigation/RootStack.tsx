import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/types';
import { PuzzleGame2 } from '@/PuzzleGame2';
import { PuzzleList } from '@/PuzzleGame2/PuzzleList';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={PuzzleList} />
      <Stack.Screen name="Game" component={PuzzleGame2} />
    </Stack.Navigator>
  );
};

export { RootStack };
