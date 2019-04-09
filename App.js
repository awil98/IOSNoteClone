import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppStack from './screens/router';
import myReducer from './store/reduxStore';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

const store = createStore(myReducer);

export default class container extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <AppStack/>
      </Provider>
    );
  }
}
