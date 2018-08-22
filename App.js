/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {Provider} from 'react-redux';
import { StyleSheet, Text, TouchableOpacity, View, Modal, TouchableHighlight} from 'react-native';
import store from './store/index'
import Home from './components/home'
import {YellowBox} from 'react-native';
console.disableYellowBox = true
export default class App extends Component {


  render()
  {
    console.log(store.getState())
    return(
        <Provider store={store}>
          <Home/>
       </Provider>

      );
  }

    

  
}

