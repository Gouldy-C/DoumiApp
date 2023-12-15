import {Text, View, StyleSheet} from 'react-native'
import React from 'react'

const UserFavorites = () => {
  return (
      <View style={styles.safeView}>
        <Text style={{fontSize: 18, paddingVertical: 10}}>User Favorites</Text>
      </View>
  )
}

export default UserFavorites

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    alignItems: "center",
  }
})