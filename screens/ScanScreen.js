import React, { Component } from 'react';
import Scanner from '../src/Scanner';

export default class ScanScreen extends Component {
  static navigationOptions = {
    title: 'Scan',
  };

  render() {
    return (
      <Scanner />
    );
  }
}
