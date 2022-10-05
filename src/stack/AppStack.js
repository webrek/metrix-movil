import React, {useContext, useState, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text, View} from 'react-native';
import TiendasScreen from '../screen/Tiendas';
import CampScreen from "../screen/Camp";

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: '#F9362C',
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
      <Stack.Screen name="Tiendas" component={TiendasScreen} />
      <Stack.Screen name="Camp" component={CampScreen} />
    </Stack.Navigator>
  );
};

export default AppStack;
