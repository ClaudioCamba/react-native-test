import React, {useState} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import ClickButton from './Button'

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hello</Text>
      <Text style={styles.text}>heloo</Text>
      <ClickButton />
    </View>
  )
}

// React Native Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#F2590C',
  }
});
