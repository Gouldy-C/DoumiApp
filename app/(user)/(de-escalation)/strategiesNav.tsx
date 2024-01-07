import {Text, View, StyleSheet, Pressable, Image, ScrollView} from 'react-native'
import React from 'react'
import { strategyCatagories, strategies} from '@constants/data'
import { router } from 'expo-router'



const DeEscalationPage = () => {
  return (
    <ScrollView style={{flex: 1}}>
      <View style={styles.safeView}>
        {strategyCatagories.map((strategy, index) => (
          <Pressable
            key={index}
            onPress={() => router.push({ pathname: '/(user)/(de-escalation)/strategiesGroups', params: { strategy: strategy.title } })}
          >
            <View style={{flexDirection: 'row', alignItems: 'center', minWidth: '90%', marginVertical: 14, backgroundColor: 'white', elevation: 8, shadowColor: '#000000', borderRadius: 15, borderWidth: 1, borderColor: 'grey'}}>
              {/* <Image
                style={{}}
                source={strategy.image}
                placeholder={'placeholder'}
                contentFit="cover"
                transition={1000}
              /> */}
              <Text style={{padding: 20, marginStart: 15, fontSize: 20, height: 100, textAlign:'center', textAlignVertical: 'center'}}>{strategy.image}</Text>
              <View style={{alignItems: 'flex-start', }}>
                <Text style={{fontSize: 22, fontWeight: '500', paddingBottom:5}}>{strategy.title}</Text>
                <Text style={{fontSize: 18}}>{strategy.addresses}</Text>
              </View>
            </View>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  )
}

export default DeEscalationPage

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    alignItems: 'center'
  }
})