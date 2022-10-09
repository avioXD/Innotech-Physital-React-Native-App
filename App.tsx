/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useState } from "react";
import { useColorScheme } from "react-native";
import Navigator from "./screens/Navigator";
import { DarkTheme, LightTheme, ThemeSelector } from "./theme";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const App = () => {
  const colorScheme = useColorScheme();
  const color = LightTheme;
  const themeStyles = ThemeSelector(colorScheme);

  return <Navigator theme={themeStyles} color={color}></Navigator>;
};

export default App;
