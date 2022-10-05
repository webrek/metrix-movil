import React from 'react';
import {View} from 'react-native';

const Layout = ({children, title}) => (
  <View
    style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
    }}>
    {children}
  </View>
);

export default Layout;
