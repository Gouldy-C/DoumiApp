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

        return (
          <View style={{flex: 1, paddingHorizontal: 15, paddingVertical: 8}} key={index}>
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ borderBottomWidth: isFocused ? 2 : 0, borderColor: isFocused ? '#5049A4' : '#6D6B82' }}
            >
              {options.tabBarIcon && options.tabBarIcon({color: isFocused ? '#5049A4' : '#6D6B82', focused: isFocused})}
              <Animated.Text style={{ color: isFocused ? '#5049A4' : '#6D6B82', fontSize: 18, paddingVertical: 5, fontWeight: isFocused ? '600' : '400' }}>
                {label as string}
              </Animated.Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
}

export { TopTabBar }