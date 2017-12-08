
import EnvironmentJson from '../../environment';

let environment = [];
let currentEnv = {};

function _init() {
  if (environment.length === 0) {
    environment = EnvironmentJson.environment;
    currentEnv = environment.find((item) => {
      return item.type === EnvironmentJson.default;
    });
  }
}

export const EnvironmentInfo = {
  getEnv() {
    _init();
    return environment;
  },
  getCurrentEnv() {
    _init();
    return currentEnv;
  },
  setCurrentEnv(type) {
    currentEnv = environment.find((item) => {
      return item.type === type;
    });
  },
};
