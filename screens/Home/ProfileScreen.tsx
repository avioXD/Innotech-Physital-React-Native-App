import React, { useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Dimensions,
  Text,
  TextInput,
  View,
  StyleSheet,
  Modal,
  Animated,
  Image,
} from "react-native";
import { Avatar, Button, Icon } from "react-native-elements";
import { styles } from "../../theme";
import ImagePicker from "react-native-image-crop-picker";
import { connect } from "react-redux";
import {
  getAvater as getAvatar,
  logOutUser,
  saveAvater as saveAvatar,
  storeUserLocal,
} from "../../services/asyncStorage";
import { updateUser } from "../../services/api";
import { getAppVersionName } from "../../helper/version";
const image_url = require("../../assets/icons/user.png");
function ProfileScreen(props) {
  let user: any = props.user;
  const theme = props.route.params.theme;
  const color = props.route.params.color;
  // const state = props.getState()
  const [name, setName] = useState(user.name);
  const [email, sendmail] = useState(user.email);
  const [phone, setphone] = useState(user.phone.toString());
  const [avatarImg, setAvatarImg] = useState("");
  const [viewImage, setViewImage] = useState(false);
  const [editable, setEditable] = useState(false);
  const [imagEditable, setimageEditable] = useState(false);
  const [address, setAddress] = useState(user.address);
  const version = getAppVersionName();
  useEffect(() => {
    getAvatar().then((res: any) => {
      if (res) {
        setAvatarImg(res);
      }
    });
  }, []);
  const logout = () => {
    logOutUser().then(() => {
      props.changeUser({});
    });
  };

  const onImagePick = () => {
    setimageEditable(true);
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
    }).then((image) => {
      setAvatarImg(image.path);
    });
  };
  const imageSave = () => {
    saveAvatar(avatarImg).then((res) => {
      setimageEditable(false);
    });
  };
  const UpdateUserOnClick = () => {
    let newuser = {
      _id: props.user?._id,
      name: name,
      email: email,
      phone: phone,
      address: address,
    };
    // console.log(newuser);
    updateUser(newuser)
      .then((res) => {
        console.log("Update", res.data.data.user);
        props.changeUser({ ...user, ...res.data.data.user });
        console.log({ ...user, ...res.data.data.user });
        storeUserLocal({ ...user, ...res.data.data.user }).then(() => {});
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <SafeAreaView style={[theme.container, { justifyContent: "flex-start" }]}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={viewImage}
        onRequestClose={() => {
          setViewImage(!viewImage);
        }}
      >
        <View style={styles.modalView}>
          <Animated.Image
            style={{
              aspectRatio: 1,
              width: "100%",
            }}
            source={avatarImg ? { uri: avatarImg } : image_url}
            resizeMode="contain"
          />
        </View>
      </Modal>
      <View
        style={{
          width: "100%",
          height: 60,
          backgroundColor: color.themecolor,
          alignItems: "center",
          flexDirection: "row",
        }}
      >
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
          Profile
        </Text>
        <View
          style={{
            position: "absolute",
            top: 15,
            right: 15,
            zIndex: 4,
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
        >
          <Icon
            size={28}
            name={editable ? "ios-checkmark-outline" : "ios-create-outline"}
            type="ionicon"
            color={color.primary}
            tvParallaxProperties={undefined}
            containerStyle={{ backgroundColor: "transparent", paddingEnd: 15 }}
            onPress={() => {
              setEditable(!editable);
              editable ? UpdateUserOnClick() : "";
            }}
          />
          <Icon
            size={28}
            name="ios-log-out-outline"
            type="ionicon"
            color={color.primary}
            tvParallaxProperties={undefined}
            containerStyle={{ backgroundColor: "transparent" }}
            onPress={logout}
          />
        </View>
      </View>

      <View
        style={[
          theme.themecolor,
          { paddingTop: 20, height: "100%", width: "100%" },
        ]}
      >
        <View
          style={[
            {
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              width: "100%",
            },
          ]}
        >
          {/* <Avatar
            onPress={() => setViewImage(!viewImage)}
            size={120}
            rounded
            source={avatarImg ? { uri: avatarImg } : image_url}
            avatarStyle={{ borderWidth: 2, borderColor: color.themecolor }}
            containerStyle={{ backgroundColor: "grey", marginLeft: 30 }}
          >
            <Icon
              size={14}
              raised
              name="attach-outline"
              type="ionicon"
              iconProps={{
                size: 20,
                name: "attach-outline",
              }}
              color={color.secondary}
              tvParallaxProperties={undefined}
              containerStyle={{ position: "absolute", bottom: 0, right: 0 }}
              onPress={imagEditable ? imageSave : onImagePick}
            />
          </Avatar> */}
          <Image
            style={{
              marginHorizontal: 15,
              width: 125,
              height: 125,
              resizeMode: "contain",
            }}
            source={require("../../assets/icons/man.png")}
          />
          {!editable ? (
            <View
              style={{
                marginTop: 50,
                marginLeft: 0,

                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={[theme.title, { color: color.primary, fontSize: 30 }]}
              >
                {user.name}
              </Text>
              <View
                style={{
                  justifyContent: "flex-start",
                  alignContent: "flex-start",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    marginVertical: 7,
                    alignItems: "center",
                  }}
                >
                  <Icon
                    size={20}
                    name="mail-outline"
                    type="ionicon"
                    color={color.textPrimary}
                    tvParallaxProperties={undefined}
                    containerStyle={{
                      backgroundColor: "transparent",
                      marginRight: 5,
                    }}
                    onPress={logout}
                  />
                  <Text style={[theme.subtitle, { color: color.textPrimary }]}>
                    {user.email}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    marginVertical: 0,
                    alignItems: "center",
                  }}
                >
                  <Icon
                    size={20}
                    name="phone-portrait-outline"
                    type="ionicon"
                    color={color.textPrimary}
                    tvParallaxProperties={undefined}
                    containerStyle={{
                      backgroundColor: "transparent",
                      marginRight: 5,
                    }}
                    onPress={logout}
                  />
                  <Text style={[theme.subtitle, { color: color.textPrimary }]}>
                    +91 {user.phone}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    marginVertical: 7,
                    alignItems: "center",
                  }}
                >
                  <Icon
                    size={20}
                    name="location-outline"
                    type="ionicon"
                    color={color.textPrimary}
                    tvParallaxProperties={undefined}
                    containerStyle={{
                      backgroundColor: "transparent",
                      marginRight: 5,
                    }}
                    onPress={logout}
                  />
                  <Text style={[theme.subtitle, { color: color.textPrimary }]}>
                    {user.address}
                  </Text>
                </View>
              </View>
            </View>
          ) : (
            <ScrollView
              decelerationRate="fast"
              contentContainerStyle={{
                paddingBottom: Dimensions.get("window").height / 6,
              }}
              style={{ marginTop: 20 }}
            >
              <View style={newStyle.inputView}>
                <TextInput
                  style={[theme.input, newStyle.inputs]}
                  placeholder="Name"
                  editable={editable}
                  placeholderTextColor={"#c9c9c9"}
                  onChangeText={(val) => {
                    setName(val);
                  }}
                  keyboardType="default"
                  value={name}
                />
              </View>
              <View style={newStyle.inputView}>
                <TextInput
                  style={[theme.input, newStyle.inputs]}
                  placeholder="Email"
                  editable={editable}
                  placeholderTextColor={"#c9c9c9"}
                  onChangeText={(val) => {
                    sendmail(val);
                  }}
                  keyboardType="email-address"
                  value={email}
                />
              </View>
              <View style={newStyle.inputView}>
                <TextInput
                  style={[theme.input, newStyle.inputs]}
                  placeholder="Phone Number"
                  editable={editable}
                  placeholderTextColor={"#c9c9c9"}
                  onChangeText={(val) => {
                    setphone(val);
                  }}
                  keyboardType="number-pad"
                  value={phone}
                />
              </View>
              <View style={[newStyle.inputView, { alignItems: "flex-start" }]}>
                <TextInput
                  style={[
                    theme.input,
                    newStyle.inputs,
                    { borderRadius: 10, height: 100, textAlignVertical: "top" },
                  ]}
                  multiline
                  numberOfLines={4}
                  placeholder="Address"
                  value={address}
                  editable={editable}
                  placeholderTextColor={"#c9c9c9"}
                  onChangeText={(val) => {
                    setAddress(val);
                  }}
                  keyboardType="default"
                />
              </View>
            </ScrollView>
          )}
        </View>
      </View>
      {!editable ? (
        <Text
          style={[
            theme.subtitle,
            {
              textAlign: "center",
              fontSize: 16,
              position: "absolute",
              bottom: Dimensions.get("screen").height / 15 + 10,
            },
          ]}
        >
          version: {version}
        </Text>
      ) : (
        <></>
      )}
    </SafeAreaView>
  );
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
function mapDispatchToProps(dispatch) {
  return {
    changeUser: (user) => dispatch({ type: "SET_USER", payload: user }),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);

const newStyle = StyleSheet.create({
  inputNew: {
    width: Dimensions.get("screen").width - 50,
    borderWidth: 0,
    padding: 0,
    color: "#4F5859",
    fontSize: 17,
    margin: 0,
    borderRadius: 100,
    paddingHorizontal: 10,
    fontFamily: "Raleway",
    marginVertical: 4,
  },
  inputView: {
    flexDirection: "row",
    alignItems: "center",
    color: "#4F5859",
  },
  inputs: {
    color: "#4F5859",
    borderColor: "#D0D0D0",
  },
});
