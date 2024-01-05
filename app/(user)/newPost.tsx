import {Text, View, StyleSheet, TextInput, Button} from 'react-native'
import React, { useState } from 'react'
import { handlePost } from '@utils/posting/functions';
import { router } from 'expo-router';

const NewPost = () => {
  
  const [ inputValue, setInputValue ] = useState('')
  
  const handleInputChange = (text:string) => {
    setInputValue(text);
  };

  const submitPost = async () => {
    handlePost(inputValue)
    setInputValue('')
    router.push('/(user)/(feed)/userFeed')
  };

  return (
      <View style={styles.safeView}>
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder='Type something...'
            onChangeText={handleInputChange}
            value={inputValue}
          />
        </View>
        <View style={styles.button}>
          <Button title="Post" onPress={submitPost} />
        </View>
      </View>
  )
}

export default NewPost

const styles = StyleSheet.create({
  safeView: {
    marginTop: 30,
    flex: 1,
    alignItems: "center",
  },
  container: {
    width: "80%",
    height: 40,
    alignSelf: "center",
    borderColor: 'black',
    borderWidth: 1,
    paddingLeft: 1,
  },
  input: {
    backgroundColor: 'white',
    height: '100%'
  },
  button: {
    marginTop: 10
  },
})