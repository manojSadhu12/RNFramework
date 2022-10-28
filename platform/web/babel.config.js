module.exports = {
    presets: ['@babel/preset-env', ["@babel/preset-react", {
        "runtime": "automatic"
    }]],
    plugins: ['react-native-web', 'react-native-reanimated/plugin']
};