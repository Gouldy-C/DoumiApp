import { View, Text, TouchableOpacity, Keyboard } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { useEffect, useLayoutEffect, useState } from 'react';

export function CustomTabs({ state, descriptors, navigation }: BottomTabBarProps) {
  const [keyboardStatus, setKeyboardStatus] = useState<boolean>()
  
  useLayoutEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
  return (
    <View style={{ flexDirection: 'row', paddingBottom: 1, paddingTop: 2, backgroundColor: 'white', elevation: 25, borderTopColor: '#9F9CC070', borderTopWidth: 1, display: keyboardStatus ? 'none' : 'flex'}}>
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
            <Text style={{ color: isFocused ? label === 'Strategies'? '#734595' : '#5049A4' : '#6D6B82', fontSize: 16, textAlign: "center", fontWeight: '500'}}>
              {label as string}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
