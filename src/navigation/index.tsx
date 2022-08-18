import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import LinkingConfiguration from './LinkingConfiguration';
import { RootStack } from './RootStack';
import { navigationRef } from './utils';

export default function Navigation() {
  return (
    <NavigationContainer linking={LinkingConfiguration} ref={navigationRef}>
      <RootStack />
    </NavigationContainer>
  );
}
