import { StyleSheet } from 'react-native';

export const constStyles = StyleSheet.create({
  labels: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 3,
    marginVertical: 5,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#d0e0e3',
    width: 70,
    gap: 8,
    elevation: 1, 
    shadowColor: '#a2bdc2',
    shadowOffset: { width: 2, height: 10 },
    shadowOpacity: 3,
    backgroundColor: 'white'
  },
  postText: {
    fontSize: 18
  }
})