import {Text, View, StyleSheet} from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';



const DeEscalationFavorites = () => {
  const params = useLocalSearchParams()


  return (
      <View style={styles.safeView}>
        <Text style={{fontSize: 18, paddingVertical: 10}}>{params.strategy}</Text>
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