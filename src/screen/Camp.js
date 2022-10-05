import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';
import {FlatList, Text, View, StyleSheet, SafeAreaView} from 'react-native';
import {FAB, ListItem} from '@rneui/themed';
import {AuthContext} from '../lib/AuthProvider';
import api from '../util/api';

const CampScreen = ({route, navigation}) => {
  const {tienda_id} = route.params;
  const {user, logOut} = useContext(AuthContext);
  const [camps, setCamps] = useState([]);
  const [tienda, setTienda] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [value, onChangeText] = useState(route.params.tienda_titulo);

  useEffect(() => {
    const fetchData = () => {
      api({token: user.token})
        .get('camps', {
          params: {
            tienda_id: tienda_id,
          },
        })
        .then(({data}) => {
          setCamps(data);
          setTienda(data.data);
          setTitulo(data.tienda.nombre);
        })
        .catch(error => {
          console.log(error);
        });
    };
    fetchData();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: value === '' ? 'No title' : value,
    });
  }, [navigation, value]);

  const renderItem = ({item}) => (
    <ListItem bottomDivider>
      <ListItem.Content>
        <ListItem.Title>{item.camp_nombre}</ListItem.Title>
        <ListItem.Subtitle>{item.concepto}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );

  return (
    <>
      <View style={styles.container}>
        <View>
          <FlatList
            data={camps.data}
            renderItem={renderItem}
            keyExtractor={item => item.info_id}
          />
        </View>
        <FAB
          style={styles.fab}
          icon={{
            name: 'camera-alt',
            size: 25,
            color: 'white',
          }}
          color={'#F9362C'}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  container: {
    flex: 1,
  },
});

export default CampScreen;
