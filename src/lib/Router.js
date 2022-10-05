import React, {useState, useEffect, useContext} from 'react';
import {AuthContext} from './AuthProvider';
import * as SecureStore from 'expo-secure-store';
import {ActivityIndicator, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from '../stack/AuthStack';
import TabNavigation from "../stack/TabNavigation";

const Router = () => {
  const {user, setUser} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    SecureStore.getItemAsync('user')
      .then(userString => {
        setUser(JSON.parse(userString));
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  if (loading) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <NavigationContainer>
      {user ? <TabNavigation /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Router;
