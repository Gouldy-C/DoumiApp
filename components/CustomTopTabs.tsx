import { Animated, View, TouchableOpacity } from 'react-native';
import { MaterialTopTabBarProps } from "@react-navigation/material-top-tabs";


function TopTabBar({ state, descriptors, navigation, position }: MaterialTopTabBarProps) {
  return (
    <View style={{ flexDirection: 'row' }}>
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
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const inputRange = state.routes.map((_, i) => i);
        const opacity = position.interpolate({
          inputRange,
          outputRange: inputRange.map(i => (i === index ? 1 : 0)),
        });

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1, borderBottomWidth: isFocused ? 2 : 0, borderColor: isFocused ? '#5049A4' : '#6D6B82' }}
          >
            {options.tabBarIcon && options.tabBarIcon({color: isFocused ? '#5049A4' : '#6D6B82', focused: isFocused})}
            <Animated.Text style={{ color: isFocused ? '#5049A4' : '#6D6B82', fontSize: 18, textAlign: "center", paddingVertical: 10}}>
              {label as string}
            </Animated.Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export { TopTabBar }