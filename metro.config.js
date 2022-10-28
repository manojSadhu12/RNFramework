/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  resolver: {
    // assetExts: ['png'],
    // sourceExts: ['png'],
    resolveRequest: (context, moduleName, platform) => {
      if (moduleName.endsWith('jpeg')) {
        const r = context.resolveRequest(context, moduleName, platform);
        console.log(r)
      }
      return context.resolveRequest(context, moduleName, platform);
    }
  }
};
