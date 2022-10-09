/**
 * @format
 */
import React from "react";
import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { StatusBar } from "native-base";

const user_init = {
  user: {},
};
const reducer = (state = user_init, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        user: action.payload,
      };
    default:
      return state;
  }
};

export const store = createStore(reducer);
const RNRedux = () => (
  <Provider store={store}>
    <App />
    <StatusBar backgroundColor={"#548EFF"} />
  </Provider>
);
AppRegistry.registerComponent(appName, () => RNRedux);
