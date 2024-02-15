// import React, {useState} from 'react';
import {StyleSheet, View, Text, Button, TextInput, Pressable} from 'react-native';
import * as React from "react";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CustomButton from './CustomButton';
import { useState, useCallback } from 'react';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    //           <View style={styles.container}>
    //   <Text>Hello</Text>
    //   <Text style={styles.text}>heloo</Text>
    //   <ClickButton />
    //   <Button
    //   title="Go to Home"
    //   onPress={() =>
    //     navigation.navigate('Home', {name: 'Jane'})
    //   }
    // />
    // </View>
    <NavigationContainer>
    <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Welcome'}}
        />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="About" component={About} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const HomeScreen = ({navigation}) => {
  return (
    <>
    <Button
      title="Go to Jane's profile"
      onPress={() =>
        navigation.navigate('Profile', {name: 'Jane'})
      }
    />
    <Button
    title="Go to About page"
    onPress={() =>
      navigation.navigate('About', {page: 'About'})
    }
  />
  <CustomButton />
    </>
  );
};
const ProfileScreen = ({navigation, route}) => {
      const [groceryItem, setGroceryItem] = useState('');
      const [items, setItems] = useState([]);
    
      const addNewItemToShoppingList = useCallback(() => {
        setItems([groceryItem, ...items]);
        setGroceryItem('');
      }, [groceryItem, items]);
    
      return (

        <>
          <TextInput
            value={groceryItem}
            placeholder="Enter grocery item"
            onChangeText={text => setGroceryItem(text)}
          />
          <Button 
            style = {styles.button}
            title="Add the item to list"
            onPress={addNewItemToShoppingList}
          />
          {items.map((item, index) => (
            <Text key={index}>{item}</Text>
          ))}

        </>
      );
    }

const About = ({navigation, route}) => {
  return <Text>This is {route.params.page} page</Text>;
};

// React Native Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#F2590C',
  },
  button: {
    color: 'red',
    backgroundColor: 'pink',
    width: '50%',
    padding: '1em'
  }
});
