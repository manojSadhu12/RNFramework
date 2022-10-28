import React from 'react';
import {Dimensions, Image, Text, View} from "react-native";

const App = () => {
    return <View>
            <Image style={{height: 300, width: Dimensions.get('window').width - 20, margin: 10}} borderRadius={10}
                   source={require('./assets/t.jpeg')}/>
            <Text>Loading.!!..!!....!!</Text>
        </View>
};
export default App;
