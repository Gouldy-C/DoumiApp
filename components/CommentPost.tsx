import { Pressable, Text } from 'react-native'
import CommentPostSvg from './svg-components/commentPostSvg'
import { constStyles } from '@constants/Styles'


const CommentPost = ({onPress}:{onPress:()=>void}) => {
  return (
    <Pressable style={constStyles.labels} onPress={onPress}>{
      <CommentPostSvg stroke="#9747FF" scale={0.73} height={25} width={25}/>
    }
      <Text style={{fontWeight: 'bold', color: '#9747FF'}}>1</Text>
    </Pressable>
  )
}

export default CommentPost