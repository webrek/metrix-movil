import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import TiendasScreen from '../screen/Tiendas';
import PerfilScreen from '../screen/Perfil';
import GaleriaScreen from '../screen/Galeria';

const Tab = createBottomTabNavigator();

const screenOptionStyle = {
  tabBarActiveTintColor: '#e91e63',
  headerStyle: {
    backgroundColor: 'rgba(255,0,0,0.72)',
  },
  headerTintColor: 'white',
  headerBackTitle: 'Back',
  headerTitleAlign: 'center',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  tabBarStyle: [
    {
      display: 'flex',
    },
    null,
  ],
};

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="Tiendas" screenOptions={screenOptionStyle}>
      <Tab.Screen
        name="Tiendas"
        component={TiendasScreen}
        options={{
          tabBarLabel: 'Tiendas',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="store" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Galeria"
        component={GaleriaScreen}
        options={{
          tabBarLabel: 'Galeria',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="image" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={PerfilScreen}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
