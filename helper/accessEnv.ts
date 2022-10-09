import Config from "react-native-config";

const cache: Record<string, string> = {};

const accessEnv = (key: string, defaultValue?: string | number): any => {
  // If the .env variable is not declared
  if (![key in Config]) {
    return defaultValue;
    // throw new Error(`${key} not found in .env`);
  }

  // If returned as undefined
  if (Config[key] === undefined) {
    return defaultValue;
    //  throw new Error(`${key} not found in .env`);
  }

  if (cache[key]) {
    return cache[key];
  }

  cache[key] = Config[key];

  return Config[key];
};

export default accessEnv;
