import { Modal, Pressable, StyleSheet, Text, View, Image } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { Strategy } from '@utils/types/types';
import BackArrowSvg from './svg-components/backArrowSvg';
import BookmarkStrategy from './BookmarkStrategy';
import CloseXSvg from './svg-components/closeXSvg';



const StrategyModal = ({
  selectedStrategyIndex,
  setSelectedStrategyIndex,
  filteredStrategies
}:{
  selectedStrategyIndex: number | null,
  setSelectedStrategyIndex: React.Dispatch<React.SetStateAction<number | null>>,
  filteredStrategies: Strategy[]
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const strategy = filteredStrategies[selectedStrategyIndex ? selectedStrategyIndex : 0];
  

  const closeModal = () => {
    setModalVisible(false);
    setSelectedStrategyIndex(null);
  }
  
  const nextStrategy = () => {
    const newIndex = selectedStrategyIndex! + 1 < filteredStrategies.length ? selectedStrategyIndex! + 1 : 0
    setSelectedStrategyIndex(newIndex);
  }
  
  useLayoutEffect(() => {
    if (selectedStrategyIndex === null){
      setModalVisible(false);
    }
    else {
      setModalVisible(true);
    }
  }, [selectedStrategyIndex])

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
            <View style={{flexDirection:'row', justifyContent: 'space-between', marginBottom: 20}}>
              <Pressable onPress={closeModal} style={{paddingHorizontal:15, paddingVertical: 15}}>
                  <CloseXSvg height={22} width={22} color={'#424052'} scale={1}/>
              </Pressable>
              <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 28, textAlignVertical: 'center', maxWidth: '60%'}}>{strategy.title}</Text>
              <BookmarkStrategy strategy_id={strategy.strategyId} />
            </View>
            <View style={{alignSelf: 'center'}}>
              <Image
                  style={{
                    height: 200,
                    width: 180,
                    borderRadius: 25,
                    
                  }}
                  source={strategy.image}
                  alt={strategy.title}
                />
            </View>
            <Text style={{fontSize: 18, paddingHorizontal: 20, textAlign: 'center', marginVertical: 30}}>{strategy.description}</Text>
            { filteredStrategies.length > 1 &&
              <Pressable  onPress={nextStrategy}>
                <LinearGradient
                  start={{x: 0, y: 0.0}}
                  end={{x: 1, y: 0.0}}
                  colors={['#514AA4', '#744696']}
                  style={styles.button}>
                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10}}>
                      <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: '500', color: 'white', marginLeft: 15}}>Next Strategy</Text>
                      <BackArrowSvg height={20} width={10} scale={0.95} color={'white'} rotation={180}/>
                    </View>
                </LinearGradient>
              </Pressable>
            }
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default StrategyModal

const styles = StyleSheet.create({
  button: {
    marginVertical: 30,
    borderRadius: 60,
    elevation: 8,
    paddingVertical: 10,
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