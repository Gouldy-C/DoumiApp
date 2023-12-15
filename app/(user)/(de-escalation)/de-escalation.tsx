import {Text, View, StyleSheet} from 'react-native'
import React from 'react'

const DeEscalationPage = () => {
  return (
      <View style={styles.safeView}>
        <Text style={{fontSize: 18, paddingVertical: 10}}> De Escalation Page</Text>
      </View>
  )
}

export default DeEscalationPage

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    alignItems: "center",
  }
})