import {Text, View, StyleSheet} from 'react-native'
import React from 'react'

const DeEscalationFavorites = () => {
  return (
      <View style={styles.safeView}>
        <Text style={{fontSize: 18, paddingVertical: 10}}>De Escalation Favorites</Text>
      </View>
  )
}

export default DeEscalationFavorites

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    alignItems: "center",
  }
})