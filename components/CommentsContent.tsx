// import React from 'react';
// import { View, Text, Image, Pressable } from 'react-native';
// import BackArrowSvg from './svg-components/backArrowSvg';
// import { calculateTimeDifference } from '@utils/timeFunctions';
// import { constStyles } from '@constants/Styles';
// import BookmarkPost from './BookmarkedPosts';
// import { LinearGradient } from 'expo-linear-gradient';
// import CommentBox from './CommentBox';
// import NewComment from './NewComment';
// import { FirestorePost } from '@utils/types/types';

// const CommentsContent = (
//     { post, setModalVisible }:{
//     post: FirestorePost, 
//     setModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
// }) => {
//   return (
//     <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//       <View style={{ flex: 1, alignItems: 'flex-start', paddingLeft: 10 }}>
//         <View style={{ alignItems: 'center', flexDirection: 'row', marginBottom: 10 }}>
//           <Pressable onPress={() => setModalVisible(false)} style={{ width: 24, marginRight: 20, marginLeft: 6 }}>
//             <BackArrowSvg height={24} width={20} color={'#424052'} scale={1.2} />
//           </Pressable>
//           <Image source={{ uri: post.photoURL }} style={{ height: 35, aspectRatio: 1, borderRadius: 50, marginRight: 5 }} />
//           <View>
//             <Text style={{ fontSize: 19, fontWeight: '500' }}>{post.displayName}</Text>
//             <Text>{post.timestamp?.seconds && calculateTimeDifference(post.timestamp.toDate())}</Text>
//           </View>
//         </View>
//         <View style={{ paddingRight: 25, width: '100%' }}>
//           <Text style={constStyles.postText}>{post.content}</Text>
//         </View>
//       </View>
//       <BookmarkPost post={post} />
//     </View>
//   );
// };

// export default CommentsContent;
