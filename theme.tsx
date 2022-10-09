import { Dimensions } from "react-native";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const font = "Raleway-Regular";
interface ColorModel {
  primary: string;
  secondary: string;
  textPrimary: string;
  textSecondary: string;
  themecolor: string;
}

export const LightTheme: ColorModel = {
  primary: "#548EFF",
  secondary: "#ed4f42",
  textPrimary: "#4F5859",
  textSecondary: "#FFFFFF",
  themecolor: "#FFFFFF",
};
export const DarkTheme: ColorModel = {
  primary: "#ed4f42",
  secondary: "#548EFF",
  textPrimary: "#FFFFFF",
  textSecondary: "#FFFFFF",
  themecolor: "rgba(14, 14, 14, 0.9)",
};

import { StyleSheet } from "react-native";
export function ThemeSelector(mode: any) {
  let themeStyles;
  let pallet = LightTheme;
  themeStyles = StyleSheet.create({
    background: { backgroundColor: pallet.primary },
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      width: "100%",
      backgroundColor: pallet.themecolor,
    },
    textColor: { color: pallet.textPrimary },
    textDark: { color: pallet.textSecondary },
    coloredborder: { borderColor: pallet.secondary },
    secBackground: { backgroundColor: pallet.secondary },
    input: {
      width: windowWidth - 50,
      borderWidth: 2,
      padding: 10,
      color: pallet.textSecondary,
      fontSize: 16,
      borderRadius: 8,
      paddingHorizontal: 10,
      marginBottom: 16,
      borderColor: pallet.textSecondary,
      fontFamily: "Poppins-Regular",
    },
    shadow: {
      shadowColor: "#171717",
      shadowOffset: { width: -2, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 4,
    },
    card: {
      backgroundColor: "white",
      borderRadius: 8,
      paddingVertical: 45,
      paddingHorizontal: 25,
      width: "100%",
      marginVertical: 10,
    },
    shadowProp: {
      width: 100,
      height: 100,
      color: "#000",
      border: 2,
      radius: 3,
      opacity: 0.2,
      x: 0,
      y: 3,
      style: { marginVertical: 5 },
    },
    buttonStyle: {
      borderRadius: 10,
      backgroundColor: pallet.themecolor,
    },
    buttonText: {
      color: pallet.primary,
      fontSize: windowWidth / 17,
      fontFamily: font,
    },
    title: {
      fontSize: windowWidth / 15,
      color: pallet.textPrimary,
      fontFamily: "Poppins-Regular",
    },
    subtitle: {
      fontWeight: "500",
      fontSize: windowWidth / 22,
      color: pallet.textPrimary,
      margin: 5,
      fontFamily: font,
    },
    hodding: {
      fontSize: windowWidth / 15,
      color: pallet.textSecondary,
      fontFamily: font,
    },
  });
  return themeStyles;
}
const textColor = "#EFEFEF";
export const styles = StyleSheet.create({
  modalView: {
    backgroundColor: "white",
    padding: 35,
    width: "100%",
    height: "100%",
    alignItems: "center",
    shadowColor: "#000",
    justifyContent: "center",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
