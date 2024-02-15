import React, {useState} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

const ClickButton = () => {
    const [count, setCount] = useState(0);
  
    return (<>
     
        <Text>You cli {count} times - test</Text>
        <Button 
          style={styles.button}
          onPress={() => setCount(count + 1)}
          title="Click me!"
        />
    
    </>);
  };

// React Native Styles
const styles = StyleSheet.create({
    button: {
      color: '#FAE464',
      backgroundColor: '#F2590C'
    },
  });
  
  export default ClickButton;