import { Pressable, Text, View, Image, ImageSourcePropType } from 'react-native'
import React from 'react'
import BackArrowSvg from './svg-components/backArrowSvg'
import { getColor } from '@utils/stylingFunctions'
import { router } from 'expo-router'
import { strategyCatagories } from "@constants/strategiesData";




const StrategiesGroupHeader = ({groupIndex, image, variant} : {groupIndex: number, image: ImageSourcePropType, variant: 'next' | 'back'}) => {
  if (variant === 'back') {
    return (
      <View style={{width: '90%', flexDirection: 'row', alignSelf: 'center', borderRadius: 24,  gap: 2, backgroundColor: getColor(groupIndex), overflow:"hidden", justifyContent: 'space-between', marginBottom: 22, marginTop: 10, elevation: 4}}>
        <View style={{paddingHorizontal: 12, paddingVertical: 4, flex: 1}}>
          <Pressable style={{flexDirection: 'row', gap: 12, paddingHorizontal: 12, paddingVertical: 12, alignItems: 'center', flexGrow: 0}}
            onPress={() => router.push('/(user)/(de-escalation)/strategiesNav')}
          >
            <BackArrowSvg height={20} width={10} scale={0.95} color={'white'}/>
            <Text style={{color:'white', fontSize: 20}}>Back</Text>
          </Pressable>
          <Text style={{color:'white', fontSize: 30, flex: 1, paddingLeft: 12}}>{strategyCatagories[groupIndex].title}</Text>
        </View>
        <View style={{
            height: 157,
            width: 157,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <View style={{
              backgroundColor: 'white',
              height: 195,
              width: 160,
              borderTopLeftRadius: 195,
              borderBottomLeftRadius: 195,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Image
                style={{}}
                source={image}
              />
          </View>
        </View>
      </View>
    )
  }

  if (variant === 'next') {
    groupIndex = groupIndex + 1 >= strategyCatagories.length ? 0 : groupIndex + 1
    return(
      <View style={{width: '90%', flexDirection: 'row-reverse', alignSelf: 'center', borderRadius: 24,  gap: 2, backgroundColor: getColor(groupIndex), overflow:"hidden", justifyContent: 'space-between', marginTop: 'auto', marginBottom:15, elevation: 4}}>
        <View style={{paddingHorizontal: 8, paddingVertical: 4, flex: 1, flexDirection: 'column-reverse'}}>
          <Pressable style={{flexDirection: 'row', gap: 12, paddingHorizontal: 12, paddingVertical: 12,justifyContent: 'flex-end', alignItems: 'center', flexGrow: 0}}
            onPress={() => router.push({
              pathname: "/(user)/(de-escalation)/strategiesGroup",
              params: { index: groupIndex },
            })}
          >
            <Text style={{color:'white', fontSize: 20}}>Next</Text>
            <BackArrowSvg height={20} width={10} scale={0.95} color={'white'} rotation={180}/>
          </Pressable>
          <Text style={{color:'white', fontSize: 30, flex: 1, paddingHorizontal: 'auto', textAlignVertical: 'center', paddingLeft: 12}}>{strategyCatagories[groupIndex].title}</Text>
        </View>
        <View style={{
            height: 157,
            width: 157,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <View style={{
              backgroundColor: 'white',
              height: 195,
              width: 160,
              borderTopRightRadius: 195,
              borderBottomRightRadius: 195,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Image
                style={{ transform: [{translateX: -28}],}}
                source={image}
              />
          </View>
        </View>
      </View>
    )
  }
}

export default StrategiesGroupHeader