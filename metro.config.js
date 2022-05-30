// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');
const pak = require('./package.json');

const defaultConfig = getDefaultConfig(__dirname);

const modules = Object.keys({
  ...pak.peerDependencies,
});

module.exports = {
  ...defaultConfig,
  resolver: {
    extraNodeModules: modules.reduce(
      (acc, name) => {
        acc[name] = path.join(__dirname, 'node_modules', name);
        return acc;
      },
      { ...require('node-libs-react-native') }
    ),
  },

  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};
