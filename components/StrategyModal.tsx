import { Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { Strategy } from '@utils/types/types';
import CloseXSvg from './svg-components/closeXSvg';
import NotBookmarkedSvg from './svg-components/notBookmarkedSvg';



const StrategyModal = ({selectedStrategy, setSelectedStrategy}:{selectedStrategy: Strategy | null, setSelectedStrategy: React.Dispatch<React.SetStateAction<Strategy | null>>}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const closeModal = () => {
    setModalVisible(false);
    setSelectedStrategy(null);
  }

  useLayoutEffect(() => {
    if (selectedStrategy === null){
      setModalVisible(false);
    }
    else {
      setModalVisible(true);
    }
  
  }, [selectedStrategy])
  

  return (
    <View>
      <Modal
        animationType='fade'
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
              <Pressable onPress={closeModal} style={{paddingVertical:10, paddingHorizontal:15}}>
                <NotBookmarkedSvg height={28} width={25} color={'black'} scale={0.95}/>
              </Pressable>
              <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 22}}>{selectedStrategy?.title}</Text>
              <Pressable onPress={closeModal} style={{padding:15}}>
                  <CloseXSvg height={25} width={25} color={'black'}/>
              </Pressable>
            </View>
            {/* <Image
                style={{}}
                source={strategy.image}
                placeholder={'placeholder'}
                contentFit="cover"
                transition={1000}
              /> */}
              <Text
                style={{
                  padding: 20,
                  marginStart: 15,
                  fontSize: 20,
                  height: 100,
                  textAlign: "center",
                  textAlignVertical: "center",
              }}>
                Image
              </Text>
            <Text style={{fontSize: 18, paddingHorizontal: '5%'}}>{selectedStrategy?.description}</Text>
            <View style={{flexDirection:'row', justifyContent: 'center', marginVertical: 20}}>
              <Pressable onPress={closeModal}>
                <Text style={[styles.button, {borderColor: 'black'}]}>Close</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default StrategyModal

const styles = StyleSheet.create({
  button: {
    textAlign: 'center',
    padding: 10,
    borderRadius: 15,
    borderWidth: 3,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    width: '100%',
    height: '100%',
    elevation: 10,
  },
  outsideContainer: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
})