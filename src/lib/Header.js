import React, {Fragment} from 'react';
import {Image, Text} from 'react-native';

const Header = ({title}) => {
  return (
    <Fragment>
      <Image
        style={{
          width: 350,
          height: 85,
        }}
        source={require('../../assets/logo.png')}
      />
      <Text>{title}</Text>
    </Fragment>
  );
};

export default Header;
