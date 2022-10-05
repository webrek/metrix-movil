import React, {useEffect, useState, useContext} from 'react';
import {Text, FlatList, View} from 'react-native';
import {ListItem} from '@rneui/themed';
import api from '../util/api';
import {AuthContext} from '../lib/AuthProvider';
//import {openDatabase} from 'react-native-sqlite-storage';
//import * as NetInfo from '@react-native-community/netinfo';

//var db = openDatabase({name: 'UserDatabase.db'});

const TiendasScreen = ({navigation, route}) => {
  const {user} = useContext(AuthContext);
  const [tiendas, setTiendas] = useState([]);

  const renderTiendas = () => {
    api({token: user.token})
      .get('tiendas')
      .then(async ({data}) => {
        setTiendas(data);
      })
      .catch(error => {});
  };

  const renderItem = ({item}) => (
    <ListItem
      bottomDivider
      onPress={() =>
        navigation.navigate('Camp', {
          tienda_id: item.id,
          tienda_titulo: item.tienda_nombre,
        })
      }>
      <ListItem.Content>
        <ListItem.Title>
          {item.tienda_nombre} - ({item.tienda_clave})
        </ListItem.Title>
        <ListItem.Subtitle>{item.cadena_nombre}</ListItem.Subtitle>
        <Text>{item.porcentaje}%</Text>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );

  return (
    <View>
      <FlatList
        data={tiendas}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default TiendasScreen;
