import { View, Text, TouchableOpacity } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { LinearGradient } from 'expo-linear-gradient';

export function CustomTabs({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
    <View >
      <LinearGradient
        start={{x: 0, y: 0.0}}
        end={{x: 1, y: 0.0}}
        colors={['#A58FF3', '#8EA2F6', '#A58FF3']}
        style={{width: '100%', height: 2}}
      />
      <View style={{ flexDirection: 'row', paddingBottom: 2, backgroundColor: 'white'}}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params)
            }
          }


          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          if (options.tabBarShowLabel === false){
            return null
          }

          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingBottom: 5, paddingTop:8 }}
            >
              {options.tabBarIcon && options.tabBarIcon({color: isFocused ? '#5049A4' : '#6D6B82', focused: isFocused, size: 30})}
              <Text style={{ color: isFocused ? '#5049A4' : '#6D6B82', fontSize: 16, textAlign: "center"}}>
                {label as string}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
