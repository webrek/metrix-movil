import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import TiendasScreen from '../screen/Tiendas';
import CampScreen from '../screen/Camp';

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: 'rgba(249,54,44,0.72)',
  },
  headerTintColor: 'white',
  headerBackTitle: 'Back',
  headerTitleAlign: 'center',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Detalle de Tiendas" component={TiendasScreen} />
      <Stack.Screen name="Camp" component={CampScreen} />
    </Stack.Navigator>
  );
};

export default AppStack;
