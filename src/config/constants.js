import ENV from 'dotenv';
ENV.config();

const devConfig = {
  MONGO_URL: process.env.MONGO_URL_DEV, //'mongodb://localhost/km-app-api-dev',
  JWT_SECRET: process.env.JWT_SECRET_DEV, //'thisisasecret',
};
const prodConfig = {
  MONGO_URL: process.env.MONGO_URL_PROD,
  JWT_SECRET: process.env.JWT_SECRET_PROD,
};
const defaultConfig = {
  PORT: process.env.PORT || 3000,
};

function envConfig(env) {
  switch (env) {
    case 'development':
      return devConfig;
    default:
      return prodConfig;
  }
}

//Take defaultConfig and make it a single object
//So, we have concatenated two objects into one
export default { ...defaultConfig, ...envConfig(process.env.NODE_ENV) };
