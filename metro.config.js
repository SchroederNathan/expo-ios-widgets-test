// Default Expo Metro config (required so Expo Router can resolve the app root).
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

module.exports = config;
