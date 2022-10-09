import React, { useState } from "react";
import {
  ScrollView,
  Modal,
  Image,
  Text,
  TouchableOpacity,
  View,
  Alert,
  ToastAndroid,
  Share,
  Linking,
  Dimensions,
} from "react-native";
import { Icon } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../../theme";
import QRCode from "react-native-qrcode-svg";
import { useClipboard } from "native-base";
import { connect } from "react-redux";

function ReferScreen({ props, route, user }) {
  const theme = route.params.theme;
  const color = route.params.color;
  const [copyText, setCopyText] = useState(user.referCode);
  const [modalVisible, setModalVisible] = useState(false);
  const { value, onCopy } = useClipboard();
  const refer_url =
    "https://622263af2ac996262cd809be--innotechphysital-admin.netlify.app/#/innotech_refer/" +
    user.referCode;
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: refer_url,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
        showToast("Shared");
      }
    } catch (error) {
      showToast("Not shared");
    }
  };
  const shareWP = () => {
    let url = "https://wa.me/?text=" + refer_url;
    Linking.openURL(url)
      .then((data) => {
        showToast("WhatsApp opened");
      })
      .catch(() => {
        showToast("something wrong");
      });
  };
  const sharefb = () => {
    let url = "https://www.facebook.com/";
    Linking.openURL(url)
      .then((data) => {
        onCopy(copyText);
        showToast("Copied");
        showToast("WhatsApp opened");
      })
      .catch(() => {
        showToast("something wrong");
      });
  };
  const showToast = (message) => {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
    );
  };
  return (
    <SafeAreaView style={[theme.container, { padding: 0, margin: 0 }]}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <TouchableOpacity
          style={[theme.container]}
          onPress={() => {
            setModalVisible(false);
          }}
        >
          <View style={styles.modalView}>
            <QRCode size={300} value={refer_url} />
          </View>
        </TouchableOpacity>
      </Modal>
      <View
        style={{
          width: "100%",
          height: 60,
          backgroundColor: color.themecolor,
          justifyContent: "flex-start",
          alignItems: "center",

          zIndex: 5,
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
              textAlign: "left",
              fontSize: 18,
              color: color.primary,
              marginLeft: Dimensions.get("screen").width / 10,
            },
          ]}
        >
          Refer & Earn
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={{
          width: Dimensions.get("screen").width,
        }}
      >
        <View
          style={[
            {
              width: Dimensions.get("screen").width,
              height: "100%",
              alignItems: "center",
              justifyContent: "flex-start",
            },
          ]}
        >
          <Text
            style={[
              theme.subtitle,
              {
                textAlign: "center",
                marginHorizontal: Dimensions.get("screen").width / 10,
                marginTop: 15,
                marginBottom: 5,
              },
            ]}
          >
            Refer Potential Leads & Get Commission on each sell
          </Text>
          <View
            style={[
              {
                flexDirection: "column",
                width: "100%",
                alignItems: "center",
              },
            ]}
          >
            <Image
              style={{
                width: Dimensions.get("screen").width / 1.5,
                height: Dimensions.get("screen").width / 1.5,
                resizeMode: "contain",
              }}
              source={require("../../assets/icons/refer.png")}
            />
            <TouchableOpacity
              onPress={() => {
                onCopy(copyText);
                showToast("Copied");
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "white",
                  marginVertical: 10,
                }}
              >
                <Text
                  style={[
                    theme.title,
                    { padding: 0, color: "gray", fontSize: 22 },
                  ]}
                >
                  {copyText}
                </Text>
                <Icon
                  size={20}
                  iconStyle={{ margin: 5 }}
                  name="ios-copy-outline"
                  type="ionicon"
                  color={color.primary}
                  tvParallaxProperties={undefined}
                />
              </View>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                margin: 5,
                width: "100%",
              }}
            >
              <Icon
                onPress={sharefb}
                name="logo-facebook"
                type="ionicon"
                color={"#4267B2"}
                size={35}
                containerStyle={{
                  marginHorizontal: Dimensions.get("screen").width / 18,
                  backgroundColor: "transparent",
                }}
                tvParallaxProperties={undefined}
              />

              <Icon
                onPress={onShare}
                name="share"
                type="font-awesome"
                color={color.primary}
                size={35}
                containerStyle={{
                  marginHorizontal: Dimensions.get("screen").width / 18,
                  backgroundColor: "transparent",
                }}
                tvParallaxProperties={undefined}
              />

              <Icon
                onPress={shareWP}
                size={35}
                name="logo-whatsapp"
                type="ionicon"
                color="#25D366"
                containerStyle={{
                  marginHorizontal: Dimensions.get("screen").width / 18,
                  backgroundColor: "transparent",
                }}
                tvParallaxProperties={undefined}
              />
            </View>
          </View>
          <TouchableOpacity
            style={{
              padding: 5,
              marginTop: 15,
              backgroundColor: "white",
            }}
            onPress={() => {
              setModalVisible(true);
            }}
          >
            <QRCode
              size={Dimensions.get("screen").width / 2.5}
              value={refer_url}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapStateToProps)(ReferScreen);
