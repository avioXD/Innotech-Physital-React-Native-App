import React, { useEffect, useCallback, useState } from "react";
import {
  Text,
  SafeAreaView,
  View,
  Dimensions,
  ScrollView,
  RefreshControl,
  Image,
} from "react-native";
import { Avatar, Divider } from "react-native-elements";

import { LineChart, PieChart } from "react-native-chart-kit";

import { connect } from "react-redux";
import { StackActions } from "@react-navigation/native";
import * as RootNavigation from "../../RootNavigation.js";
const image_url = require("../../assets/icons/user.png");
import {
  getAvater as getAvatar,
  logOutUser,
  saveAvater as saveAvatar,
  storeUserLocal,
} from "../../services/asyncStorage";
import { getUserById } from "../../services/api";

function DashBoardScreen({ route, user, navigation, changeUser }) {
  const theme = route.params.theme;
  const color = route.params.color;
  const [avatarImg, setAvatarImg] = useState("");
  const [refreshing, setRefreshing] = React.useState(false);
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getUserById(user._id).then((res) => {
      storeUserLocal(res.data.data.user);
      changeUser(res.data.data.user);
    });
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const pieData = [
    {
      name: "Referred",
      population: user.stats.referred,
      color: "#6F6F6F",
      legendFontColor: "white",
      legendFontSize: 10,
    },
    {
      name: "Register",
      population: user.stats.converted,
      color: "#FFAE02",
      legendFontColor: "white",
      legendFontSize: 10,
    },
    {
      name: "Converted",
      population: user.stats.converted,
      color: "#71DB00",
      legendFontColor: "white",
      legendFontSize: 10,
    },
  ];
  useEffect(() => {
    getAvatar().then((res: any) => {
      console.log(res);
      if (res) {
        console.log(res);
        setAvatarImg(res);
      }
    });
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: color.themecolor }}>
      <View
        style={{
          height: 60,
          backgroundColor: color.themecolor,
          justifyContent: "flex-start",
          alignItems: "center",

          zIndex: 5,
          flexDirection: "row",
        }}
      >
        {/* <Avatar
          onPress={() => RootNavigation.navigate("profile")}
          size={40}
          rounded
          source={avatarImg ? { uri: avatarImg } : image_url}
          avatarStyle={{ borderWidth: 0, borderColor: color.themecolor }}
          containerStyle={{
            backgroundColor: "grey",
            marginLeft: 10,

            left: 0,
          }}
        ></Avatar> */}
        <Image
          style={{
            marginHorizontal: 15,
            width: 80,
            height: 80,
            resizeMode: "contain",
          }}
          source={require("../../assets/icons/trademark.png")}
        />
        <Text
          style={[
            theme.title,
            {
              textAlign: "center",
              fontSize: 18,
              color: color.primary,
              marginLeft: Dimensions.get("screen").width / 10,
            },
          ]}
        >
          Earnings
        </Text>
        {/* <Text
          style={[
            theme.title,
            {
              position: "absolute",
              right: 5,
              textAlign: "center",
              fontSize: 14,
              color: color.textPrimary,
              marginLeft: 5,
            },
          ]}
        >
          {user.name}
        </Text> */}
      </View>
      <ScrollView
        contentContainerStyle={{}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View
          style={[
            {
              height: Dimensions.get("window").height - 30,
              marginTop: 0,
              backgroundColor: color.themecolor,
              alignItems: "center",
            },
          ]}
        >
          <View
            style={[
              {
                marginTop: 40,
                width: Dimensions.get("window").width - 20,
                shadowColor: "#DEF1F2 ",
                padding: 30,
                overflow: "hidden",
                backgroundColor: theme.themecolor,
                alignItems: "center",
              },
            ]}
          >
            <View
              style={{
                width: "100%",
                backgroundColor: theme.themecolor,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                  marginBottom: 15,
                }}
              >
                <Text
                  style={[
                    theme.title,
                    {
                      textAlign: "center",
                      fontSize: 30,
                      color: color.primary,
                    },
                  ]}
                >
                  {"\u20B9"}
                  {user.totalAmount ? user.totalAmount : "0"}
                </Text>
                <Image
                  style={{
                    width: 65,
                    height: 65,
                    resizeMode: "contain",
                    marginBottom: 15,
                    marginLeft: 10,
                  }}
                  source={require("../../assets/icons/rupe.png")}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Text
                    style={[
                      theme.title,
                      { textAlign: "center", fontSize: 20, color: "#6F6F6F" },
                    ]}
                  >
                    {user.stats.referred ? user.stats.referred : "0"}{" "}
                  </Text>
                  <Text style={[theme.subtitle]}>Referred</Text>
                </View>
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Text
                    style={[
                      theme.title,
                      { textAlign: "center", fontSize: 20, color: "#FFAE02" },
                    ]}
                  >
                    {user.stats.registered ? user.stats.registered : "0"}{" "}
                  </Text>
                  <Text style={[theme.subtitle]}>Registered</Text>
                </View>
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Text
                    style={[
                      theme.title,
                      {
                        textAlign: "center",
                        fontSize: 20,
                        color: "#71DB00",
                      },
                    ]}
                  >
                    {user.stats.converted}
                  </Text>
                  <Text style={[theme.subtitle]}>Converted</Text>
                </View>
              </View>
            </View>
          </View>

          <View
            style={[
              {
                marginTop: 0,
                alignItems: "center",
                justifyContent: "flex-start",
              },
            ]}
          >
            {/* <Text style={theme.subtitle}>This Month earning: {'\u20B9'}0/-  </Text>
                     <Text style={theme.subtitle}>Previous month earning: {'\u20B9'}0/-  </Text> */}
            {/* <View style={{width: '100%'}}>
                         <Divider width={1} style={{marginVertical: 10, opacity: 0.3}} color={color.primary} />
                        </View> */}
            {/* <Text style={[theme.title, { textAlign: "center" }]}>
                Monthly Earning Analysis{" "}
              </Text>
              <View style={{ width: "100%" }}>
                <Divider
                  width={1}
                  style={{ marginVertical: 10, opacity: 0.3 }}
                  color={color.primary}
                />
              </View>

              <LineChart
                data={{
                  labels: [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "jul",
                    "Aug",
                    "Sep",
                    "oct",
                    "nov",
                    "dec",
                  ],
                  datasets: [
                    {
                      data: [
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                      ],
                    },
                  ],
                }}
                width={Dimensions.get("window").width} // from react-native
                height={220}
                yAxisLabel={"\u20B9"}
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                  backgroundColor: "",
                  backgroundGradientFrom: color.themecolor,
                  backgroundGradientTo: color.themecolor,
                  decimalPlaces: 2, // optional, defaults to 2dp
                  color: (opacity = 0.2) => color.primary,
                  labelColor: (opacity = 0.2) => color.primary,
                  style: {
                    borderRadius: 12,
                    elevation: 0,
                  },
                  propsForDots: {
                    r: "4",
                    strokeWidth: "2",
                    stroke: color.textPrimary,
                  },
                }}
                bezier
              /> */}
            {/* <View style={{ width: "100%" }}>
                <Divider
                  width={1}
                  style={{ marginVertical: 10, opacity: 0.3 }}
                  color={color.primary}
                />
              </View> */}
            {/* <Text style={[theme.title, { textAlign: "center" }]}>
              {" "}
              Referred & Converted{" "}
            </Text> */}
            {/* <View style={{ width: "100%" }}>
              <Divider
                width={1}
                style={{ marginVertical: 10, opacity: 0.3 }}
                color={color.primary}
              />
            </View> */}
            {/* <View style={{ paddingLeft: 10 }}>
                <Text style={[theme.subtitle, { textAlign: "left" }]}>
                  Referred :{" "}
                  <Text
                    style={[
                      theme.title,
                      { textAlign: "center", fontSize: 20, color: "#f5aa42" },
                    ]}
                  >
                    {" "}
                    {user.stats.referred}
                  </Text>{" "}
                </Text>
                <Text style={[theme.subtitle, { textAlign: "left" }]}>
                  Converted :{" "}
                  <Text
                    style={[
                      theme.title,
                      {
                        textAlign: "center",
                        fontSize: 20,
                        color: color.secondary,
                      },
                    ]}
                  >
                    {" "}
                    {user.stats.converted}
                  </Text>{" "}
                </Text>
              </View> */}
            {user.stats.referred ? (
              <PieChart
                data={pieData}
                width={Dimensions.get("window").width}
                height={250}
                chartConfig={{
                  backgroundColor: color.secondary,
                  backgroundGradientFrom: color.primary,
                  backgroundGradientTo: color.primary,
                  decimalPlaces: 1, // optional, defaults to 2dp
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                }}
                accessor={"population"}
                backgroundColor={"transparent"}
                paddingLeft={"90"}
                center={[0, 0]}
                hasLegend={false}
              />
            ) : (
              <></>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
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
export default connect(mapStateToProps, mapDispatchToProps)(DashBoardScreen);
