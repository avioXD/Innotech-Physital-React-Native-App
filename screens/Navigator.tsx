import { CommonActions, NavigationContainer } from "@react-navigation/native";
import { navigationRef } from "../RootNavigation";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthScreen from "./AuthScreen";
import * as RootNavigation from "../RootNavigation.js";
import React, { useEffect, useState } from "react";
import Signup from "./Signup";
import DashBoardScreen from "./Home/DashBoardScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ReferScreen from "./Home/RefferScreen";
import ProfileScreen from "./Home/ProfileScreen";
import MyTabBar from "./Home/components/MyTabBar";
import { getToken, getUserLocal } from "../services/asyncStorage";
import { connect } from "react-redux";
import { View, Text } from "react-native";
import { getUserById } from "../services/api";

/// home
function Home(props) {
  const Tab = createBottomTabNavigator();
  const theme = props.theme;
  const color = props.color;

  return (
    <SafeAreaProvider>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarHideOnKeyboard: true,
        }}
        initialRouteName="dashboard"
        tabBar={(props) => <MyTabBar theme={theme} {...props} color={color} />}
      >
        <Tab.Screen
          options={{ title: "Dashboard" }}
          name="dashboard"
          component={DashBoardScreen}
          initialParams={{ theme: theme, color: color }}
        />
        <Tab.Screen
          options={{ title: "Reffer" }}
          name="reffer"
          component={ReferScreen}
          initialParams={{ theme: theme, color: color }}
        />
        <Tab.Screen
          options={{ title: "Profile" }}
          name="profile"
          component={ProfileScreen}
          initialParams={{ theme: theme, color: color }}
        />
      </Tab.Navigator>
    </SafeAreaProvider>
  );
}

function AuthStack(props) {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="login"
        component={AuthScreen}
        initialParams={{ theme: props.theme, color: props.color }}
      />
      <Stack.Screen
        name="signup"
        component={Signup}
        initialParams={{ theme: props.theme, color: props.color }}
      />
    </Stack.Navigator>
  );
}

/// root navigation
function Navigator(props: any) {
  //console.log(params.theme)
  const Stack = createNativeStackNavigator();
  const [isLogin, setisLogin] = useState(false);
  const [render, setRender] = useState(false);
  useEffect(() => {
    // console.log(props.user);
    getToken()
      .then((token) => {
        if (token) {
          getUserLocal(token).then((val: any) => {
            // console.log("Lcoal", val);
            if (val) {
              props.changeUser(val);
              setisLogin(true);
              setRender(true);
              RootNavigation.navigate("home");
            }
          });
        }
      })
      .finally(() => {
        setRender(true);
      });
  }, [isLogin]);

  if (!render) {
    return (
      <View style={props.theme.container}>
        <Text style={props.theme.title}>Loading....</Text>
      </View>
    );
  } else {
    return (
      <NavigationContainer ref={navigationRef}>
        {props.user?.name ? (
          <Home theme={props.theme} color={props.color} />
        ) : (
          <AuthStack theme={props.theme} color={props.color} />
        )}
      </NavigationContainer>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    changeUser: (user) => dispatch({ type: "SET_USER", payload: user }),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Navigator);
