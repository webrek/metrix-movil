import React from 'react';
import {AuthProvider} from './src/lib/AuthProvider';
import Router from './src/lib/Router';

const App = () => {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
};

export default App;
