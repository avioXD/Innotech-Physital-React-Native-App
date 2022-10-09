import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
export const storeUserLocal = async (user) => {
  try {
    await AsyncStorage.setItem(
      "ADNK<NGFLKAGQIWCANCBALBGJAWW",
      JSON.stringify(user)
    );
  } catch (e) {
    // saving error
  }
};
export const getUserLocal = async (token) => {
  try {
    var decoded: any = jwt_decode(token);
    console.log(decoded);
    if (new Date(decoded.exp * 1000) > new Date()) {
      return JSON.parse(
        await AsyncStorage.getItem("ADNK<NGFLKAGQIWCANCBALBGJAWW")
      );
    } else {
      logOutUser();
      return {};
    }
  } catch (e) {
    // error reading value
  }
};
export const saveAvater = async (img) => {
  try {
    await AsyncStorage.setItem("IMAGESAVE", JSON.stringify(img));
  } catch (e) {
    console.log(e);
  }
};
export const getAvater = async () => {
  try {
    return JSON.parse(await AsyncStorage.getItem("IMAGESAVE"));
  } catch (e) {
    console.log(e);
  }
};

export const logOutUser = async () => {
  try {
    await AsyncStorage.removeItem("ADNK<NGFLKAGQIWCANCBALBGJAWW");
    await AsyncStorage.removeItem("TOKEN");
  } catch (e) {
    // error reading value
  }
};

export const setToken = async (token) => {
  try {
    await AsyncStorage.setItem("TOKEN", JSON.stringify(token));
  } catch (e) {}
};
export const getToken = async () => {
  try {
    return await AsyncStorage.getItem("TOKEN");
  } catch (e) {}
};
