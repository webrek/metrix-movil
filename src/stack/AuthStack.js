import React, {useContext, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AuthContext} from '../lib/AuthProvider';
import {Text, View, TextInput, StyleSheet} from 'react-native';
import {Button} from '@rneui/themed';
import Layout from '../lib/Layout';
import Header from '../lib/Header';

const Stack = createStackNavigator();

const LoginScreen = ({navigation}) => {
  const {logIn, error} = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Layout title="Iniciar Sesión">
      <Header title="" />
      <View style={styles.container}>
        {error && <Text style={{color: 'red', marginBottom: 24}}>{error}</Text>}
        <TextInput
          style={styles.input}
          onChangeText={text => setEmail(text)}
          placeholder="Email"
          textContentType="emailAddress"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          onChangeText={text => setPassword(text)}
          placeholder="Contraseña"
          secureTextEntry={true}
        />
        <Button
          title="Iniciar Sesión"
          loading={false}
          loadingProps={{size: 'small', color: 'white'}}
          buttonStyle={{
            backgroundColor: 'rgba(255, 0, 0, 1)',
            borderRadius: 5,
          }}
          titleStyle={{fontWeight: 'bold', fontSize: 23}}
          containerStyle={{
            marginHorizontal: 0,
            height: 50,
            width: '100%',
            marginVertical: 10,
          }}
          onPress={() => logIn(email, password)}
        />
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    width: '90%',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
});

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Iniciar Sesión" component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
