
import { AsyncStorage } from 'react-native';

let environment = [];
let currentEnv = {};
let EnvironmentJson = require('../../environment');

function setData() {
  environment = EnvironmentJson.environment;
  currentEnv = environment.find((item) => {
    return item.type === EnvironmentJson.default;
  });
}

function _init() {
  if (environment.length === 0) {
    AsyncStorage.getItem('environment', (err, result) => {
      if (!err && result !== null) {
        EnvironmentJson = { ...JSON.parse(result), ...EnvironmentJson, default: JSON.parse(result).default };
        setData();
      } else {
        AsyncStorage.setItem('environment', JSON.stringify(EnvironmentJson));
        setData();
      }
    });
  }
}

export const EnvironmentInfo = {
  init() {
    _init();
  },
  getEnv() {
    _init();
    return environment;
  },
  setEnv(data) {
    environment = data;
    AsyncStorage.setItem('environment', JSON.stringify({ environment: data, type: currentEnv.type }));
  },
  getCurrentEnv() {
    _init();
    return currentEnv;
  },
  setCurrentEnv(type) {
    currentEnv = environment.find((item) => {
      if (item.type === type) {
        EnvironmentJson = { environment, default: type };
        AsyncStorage.setItem('environment', JSON.stringify(EnvironmentJson));
      }
      return item.type === type;
    });
  },
};
