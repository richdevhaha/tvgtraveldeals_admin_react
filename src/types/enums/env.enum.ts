export enum EnvType {
  dev = "dev",
  testing = "testing",
  staging = "staging",
  prod = "prod",
}

export const ENV = {
  APP_ENV: process.env.REACT_APP_ENV as EnvType,
  IS_PROD: (process.env.REACT_APP_ENV as EnvType) === EnvType.prod,
  IS_TESTING: (process.env.REACT_APP_ENV as EnvType) === EnvType.testing,
  IS_STAGING: (process.env.REACT_APP_ENV as EnvType) === EnvType.staging,
};
