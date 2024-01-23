import {Text, 
  View,
  Pressable, 
  Modal,
} from 'react-native';
import React from 'react'
import CloseXSvg from './svg-components/closeXSvg';
import CheckmarkSvg from './svg-components/checkmark';
import { LinearGradient } from 'expo-linear-gradient';

const AreYouSureModal = ({header, body, state, setModalVisible, setModalReturn}: {
  header: string,
  body?: string, state:boolean,
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
  setModalReturn: React.Dispatch<React.SetStateAction<boolean>>,
}) => {
  const closeModal = () => {
    setModalReturn(false)
    setModalVisible(false);
  }


  const confirmModal = () => {
    setModalReturn(true)
    setModalVisible(false);
  };

  
  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={state}
      onRequestClose={()=> setModalVisible(false)}
    >
      <Pressable
        style={{height: '100%', width: '100%',backgroundColor: '#00000050', opacity: 10, justifyContent: 'center', alignItems: 'center'}}
        onPress={() => setModalVisible(false)}>
            <View style={{
                backgroundColor: 'white',
                padding: 26,
                borderRadius: 24,
                width: '90%',
                elevation: 10,
              }}
            >
              <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 20}}>{header}</Text>
              <Text style={{textAlign: 'center'}}>{body}</Text>
              <View style={{flexDirection:'row', justifyContent: 'space-evenly', marginVertical: 20}}>
                <Pressable onPress={closeModal} style={{flexDirection: 'row', paddingHorizontal: 32, paddingVertical: 16, justifyContent: 'center', alignItems: 'center', gap: 12}}>
                  <CloseXSvg height={18} width={18} color={'#424052'} scale={0.8}/>
                  <Text style={{fontSize: 18, textAlign: 'center', fontWeight: '600'}}>No</Text>
                </Pressable>
                <Pressable 
                  onPress={() => confirmModal()} 
                  style={{justifyContent: 'center', alignItems: 'center', borderRadius: 40}}
                >
                  <LinearGradient
                    start={{x: 0, y: 0.0}}
                    end={{x: 1, y: 0.0}}
                    colors={['#514AA4', '#744696']}
                    style={{flexDirection: 'row', paddingHorizontal: 38, paddingVertical: 16, justifyContent: 'center', alignItems: 'center', gap: 12, borderRadius: 40}}>
                      <CheckmarkSvg height={13} width={18} color={'#ffffff'} scale={1.1}/>
                      <Text style={{fontSize: 18, color: 'white', textAlign: 'center', fontWeight: '600'}}>Yes</Text>
                    </LinearGradient>
                </Pressable>
              </View>
            </View>
      </Pressable>
    </Modal>
  )
}

export default AreYouSureModal