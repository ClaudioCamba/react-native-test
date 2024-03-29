// import React, {useState} from 'react';
import {StyleSheet, View, Text, Button, TextInput, Pressable} from 'react-native';
import * as React from "react";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CustomButton from './CustomButton';
import { useState, useCallback, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDXpRHjdI5m2eHn1WXC6qQcZiz39rqzqSQ",
  authDomain: "spud-test-785d0.firebaseapp.com",
  projectId: "spud-test-785d0",
  storageBucket: "spud-test-785d0.appspot.com",
  messagingSenderId: "439052179929",
  appId: "1:439052179929:web:d98a815f0771bd1f5021c8",
  measurementId: "G-F383HTRPMB"
};

// Initialize Firebase app
initializeApp(firebaseConfig);
// init services
const db = getFirestore()
// collection ref
const colRef = collection(db, 'pizza')

function getData() {
  return getDocs(colRef)
    .then((snapshot) => {
      let pizzas = []
      snapshot.docs.forEach((doc) => {
        pizzas.push({ ...doc.data(), id: doc.id })
      })
      return pizzas
    }).catch((err) => {
      console.log(err);
    })
}

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

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

  const [taste, setTaste] = useState([])

  useEffect(()=> {
    getData().then((piz)=>{
      const allTaste = piz.map((item)=>{
        if (item.vegan === true)
    return <Text key={item.taste}>{item.taste}</Text>
      })
      setTaste(allTaste)
      console.log(allTaste);
    })
},[])

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
  <CustomButton 
   onPress={() =>
    navigation.navigate('About', {page: 'About'})
  }    
  />
  
  <Text>Potato</Text>
  <View>{taste}</View>

  </>);
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
