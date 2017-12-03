import Expo from 'expo';
import React, { Component } from 'react';
import { View } from 'react-native';

const { app } = require('../../../../lib/js/src/App');

// we don't want this to require transformation
class AwakeInDevApp extends Component {
  render() {
    return React.createElement(
      View,
      {
        style: {
          flex: 1,
        },
      },
      React.createElement(app, this.props),
      React.createElement(process.env.NODE_ENV === 'development' ? Expo.KeepAwake : View)
    );
  }
}

Expo.registerRootComponent(AwakeInDevApp);
