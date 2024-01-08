import {Text, View, StyleSheet, Button, TextInput, FlatList, Pressable, TouchableOpacity} from 'react-native';
import React from 'react';
import Posts from '@components/Posts';

const UserFeed = () => {
  // Search Consts

  // FORM ***************************************************************
  return (
    <>
      <View style={{marginTop: 10, alignItems:'center'}}>
        <TextInput
          placeholder='Search tags'
          style={{backgroundColor:'purple', height: 50, width: '80%', borderRadius: 8}}>
        </TextInput>
      </View>
      <View style={styles.safeView}>
        <View style={styles.container}>
          <Posts />
        </View>
      </View>
    </>
  )
}

export default UserFeed

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    alignItems: "center",
  },
  container: {
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  filterButton: {
    borderColor: 'black',
    borderWidth: 1,
    width: "40%",
    alignItems: 'center',
  }
})