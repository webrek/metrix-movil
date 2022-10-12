import React, {useEffect, useState, useContext} from 'react';
import {FlatList, View, ScrollView} from 'react-native';
import {Button, ListItem, Badge, FAB} from '@rneui/themed';
import api from '../util/api';
import {AuthContext} from '../lib/AuthProvider';
//import {openDatabase} from 'react-native-sqlite-storage';
//import * as NetInfo from '@react-native-community/netinfo';

//var db = openDatabase({name: 'UserDatabase.db'});

const TiendasScreen = ({navigation, route}) => {
  const {user} = useContext(AuthContext);
  const [tiendas, setTiendas] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    renderTiendas();
  }, []);

  const renderTiendas = () => {
    api({token: user.token})
      .get('movil/inicio')
      .then(async ({data}) => {
        setTiendas(data.data);
        setLoading(false);
      })
      .catch(error => {});
  };

  const renderItem = ({item, index}) => (
    <ListItem
      bottomDivider
      containerStyle={{
        backgroundColor: index % 2 == 0 ? '#ffffff' : '#d6d8db',
      }}>
      <ListItem.Content>
        <ListItem.Title>
          {item.tienda_nombre.toUpperCase()} - (
          {item.tienda_clave.toUpperCase()})
        </ListItem.Title>
        <ListItem.Subtitle>
          {item.cadena_nombre.toUpperCase()}
        </ListItem.Subtitle>
      </ListItem.Content>
      <Badge
        value={item.total_camp}
        textStyle={{color: 'white'}}
        containerStyle={{marginTop: -20}}
      />
      <ListItem.Chevron />
    </ListItem>
  );

  const listView = () => {
    return (
      <FlatList
        data={tiendas}
        renderItem={renderItem}
        keyExtractor={item => item.id}></FlatList>
    );
  };

  return (
    <>
      <View className={''}>{!loading && listView()}</View>
      <View className={'flex-1 items-center justify-center'}>
        {loading && <Button title="Solid" type="solid" loading />}
      </View>
    </>
  );
};

export default TiendasScreen;
