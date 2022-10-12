import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {FAB} from '@rneui/themed';

const GaleriaScreen = () => {
  return (
    <>
      <View>
        <Text>Galeria</Text>
      </View>
      <FAB
        visible={true}
        placement="right"
        icon={{name: 'camera-alt', color: 'white'}}
        color="red"
      />
    </>
  );
};

export default GaleriaScreen;
