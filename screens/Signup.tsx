import React, { useEffect, useState } from "react";
import {
  Keyboard,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  View,
  ToastAndroid,
} from "react-native";
import { styles } from "../theme";
import * as RootNavigation from "../RootNavigation.js";
import { SvgCss } from "react-native-svg";
import { Button } from "react-native-elements";
import { registerUser } from "../services/api";
import { setToken, storeUserLocal } from "../services/asyncStorage";
import { connect } from "react-redux";

const googleLogin = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="308.132" height="57" viewBox="0 0 308.132 57">
<defs>
  <pattern id="pattern" preserveAspectRatio="none" width="100%" height="100%" viewBox="0 0 100 100">
    <image width="100" height="100" xlink:href="data:image/png;base64,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"/>
  </pattern>
</defs>
<g id="signgoogle" transform="translate(-78 -403.728)">
  <rect id="Rectangle_5" data-name="Rectangle 5" width="308" height="57" rx="4" transform="translate(78 403.728)" fill="#fff"/>
  <rect id="icons8_google_100px" width="41" height="42" transform="translate(88 411.728)" fill="url(#pattern)"/>
  <path id="Path_2" data-name="Path 2" d="M4.815,0H241.932a5.111,5.111,0,0,1,4.815,5.363V50.95a5.111,5.111,0,0,1-4.815,5.363H4.815A5.111,5.111,0,0,1,0,50.95V5.363A5.111,5.111,0,0,1,4.815,0Z" transform="translate(139.386 404.013)" fill="#7bc6ff"/>
  <text id="Sign_in_with_Google" data-name="Sign in with Google" transform="translate(157 416.728)" fill="#fff" font-size="22" font-family="OpenSans-Bold, Open Sans" font-weight="700"><tspan x="0" y="24">Sign in with Google</tspan></text>
</g>
</svg>
`;
const emailRegex =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
const phoneNumberRegex = /\+?\d[\d -]{8,12}\d/;
const nameRegex =
  /^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/;
const passMedRegex =
  "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})";
function Signup(props) {
  const theme = props.route.params.theme;
  const color = props.route.params.color;
  const [focus, setFocus] = useState(false);
  const [credReg, setCredreg] = useState(false);
  const [name, setName] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const showToast = (message) => {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
    );
  };
  const onSignUp = () => {
    if (!name.match(nameRegex)) showToast("Invalid name");
    else if (!email.match(emailRegex)) showToast("Invalid email");
    else if (!phone.match(phoneNumberRegex)) showToast("Invalid phone number");
    else if (!password.match(passMedRegex)) showToast("Weak password");
    else if (
      password === cpassword &&
      name &&
      email &&
      address &&
      phone &&
      password
    ) {
      setLoading(true);
      let user = {
        name: name,
        email: email,
        phone: phone,
        address: address,
        password: password,
        passwordConfirm: cpassword,
      };
      registerUser(user)
        .then((res) => {
          //console.log("Rcived", res.data.data.user);
          setToken(res.data.token);
          storeUserLocal(res.data.data.user)
            .then(() => {
              setLoading(false);
              props.changeUser(res.data.data.user);
            })
            .catch((err) => {
              showToast("User Loggedin");
              setLoading(false);
            });
        })
        .catch((err) => {
          showToast("Registration failed");
        });
    }
  };
  useEffect(() => {
    // Update the document title using the browser API
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setFocus(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setFocus(false);
    });
  }, []);

  return (
    <SafeAreaView style={[theme.container, theme.background, {}]}>
      <View
        style={[
          {
            paddingTop: 40,
            height: "100%",
            width: "100%",
            top: 0,
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      >
        <SafeAreaView
          style={[theme.background, { justifyContent: "flex-end" }]}
        >
          <Text style={[theme.title, { color: color.themecolor }]}>SIGNUP</Text>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              width: "100%",
              shadowColor: "none",
              alignItems: "center",
            }}
          >
            <TextInput
              style={[theme.input]}
              placeholder="Name"
              placeholderTextColor={"#c9c9c9"}
              onChangeText={(val) => {
                setName(val);
              }}
              keyboardType="default"
              value={name}
            />
            <TextInput
              style={[theme.input]}
              placeholder="Email"
              placeholderTextColor={"#c9c9c9"}
              onChangeText={(val) => {
                setemail(val);
              }}
              keyboardType="email-address"
              value={email}
            />
            <TextInput
              style={[theme.input]}
              placeholder="Phone Number"
              placeholderTextColor={"#c9c9c9"}
              onChangeText={(val) => {
                setphone(val);
              }}
              keyboardType="number-pad"
              value={phone}
            />
            <TextInput
              style={[theme.input]}
              placeholder="Password"
              value={password}
              secureTextEntry={true}
              placeholderTextColor={"#c9c9c9"}
              onChangeText={(val) => {
                setpassword(val);
              }}
              keyboardType="default"
            />
            <TextInput
              style={[theme.input]}
              placeholder="Confirm Password"
              secureTextEntry={true}
              value={cpassword}
              placeholderTextColor={"#c9c9c9"}
              onChangeText={(val) => {
                setcpassword(val);
              }}
              keyboardType="default"
            />
            <TextInput
              style={[
                theme.input,
                { borderRadius: 10, height: 100, textAlignVertical: "top" },
              ]}
              multiline
              numberOfLines={4}
              placeholder="Address"
              value={address}
              placeholderTextColor={"#c9c9c9"}
              onChangeText={(val) => {
                setAddress(val);
              }}
              keyboardType="default"
            />
            <Button
              title="Signup"
              loading={loading}
              loadingProps={{ color: color.primary, size: 30 }}
              buttonStyle={theme.buttonStyle}
              titleStyle={theme.buttonText}
              containerStyle={{
                marginHorizontal: 20,
                height: 50,
                width: 150,
                marginVertical: 5,
              }}
              onPress={onSignUp}
            />
          </ScrollView>
        </SafeAreaView>
      </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
