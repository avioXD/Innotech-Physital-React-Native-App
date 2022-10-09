import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Keyboard,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Icon } from "react-native-elements";

export default function MyTabBar({
  state,
  descriptors,
  navigation,
  color,
  theme,
}) {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  if (isKeyboardVisible) {
    return <></>;
  } else {
    return (
      <View
        style={{
          alignItems: "center",
          padding: 2,
          justifyContent: "center",
          height: Dimensions.get("screen").height / 15,
          borderColor: color.themecolor,
          borderRadius: 0,
          position: "absolute",
          bottom: 0,
          left: 0,
          elevation: 5,
          right: 0,
          overflow: "hidden",
          backgroundColor: color.primary,
          flexDirection: "row",
        }}
      >
        {state.routes.map((route: any, index) => {
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
              type: "tabPress",
              target: route.key,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };
          let iconName = "";
          switch (label) {
            case "Dashboard":
              iconName = "bar-chart-outline";
              break;
            case "Reffer":
              iconName = "share-social-outline";
              break;
            case "Profile":
              iconName = "person-circle-outline";
              break;
          }
          return (
            <TouchableOpacity
              accessibilityRole="button"
              testID={options.tabBarTestID}
              onPress={onPress}
              //  onLongPress={onLongPress}
              style={{ alignItems: "center" }}
            >
              <View>
                <Icon
                  containerStyle={{
                    marginHorizontal: 0,
                    backgroundColor: isFocused
                      ? color.themecolor
                      : color.primary,
                    height: Dimensions.get("screen").height / 15,
                    width: Dimensions.get("screen").width / 3,
                    alignItems: "center",
                    paddingTop: 8,
                    borderRadius: 0,
                  }}
                  size={Dimensions.get("screen").height / 22}
                  name={iconName}
                  type="ionicon"
                  color={isFocused ? color.primary : color.textSecondary}
                  tvParallaxProperties={undefined}
                />
              </View>
              {/* <Text style={{ color: isFocused ? color.themecolor : '#222' }}>
                  {label}
                </Text> */}
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}
