import {Center, HStack, Pressable, Text} from "native-base";
import React from "react";
import {navigator} from "../routes";
import {SafeAreaView} from "react-native-safe-area-context";

const Footer = React.memo(() => {
    const [selected, setSelected] = React.useState(1);

    const switchRoute = navigator.useSwitch()

    return (
        <SafeAreaView>
            <HStack bg="primary.700" alignItems="center" shadow={6}>
                <Pressable opacity={selected === 0 ? 1 : 0.5} py="3" flex={1} onPress={
                    () => {
                        switchRoute("Profile/ChildPage/nChildPage1")
                        setSelected(0);
                    }
                }>
                    <Center>
                        <Text color="white" fontSize="12">
                            Child 1
                        </Text>
                    </Center>
                </Pressable>
                <Pressable opacity={selected === 1 ? 1 : 0.5} py="2" flex={1} onPress={
                    () => {
                        switchRoute("Profile/ChildPage2/nChildPage1")
                        setSelected(1);
                    }
                }>
                    <Center>
                        <Text color="white" fontSize="12">
                            Child 2
                        </Text>
                    </Center>
                </Pressable>
            </HStack>
        </SafeAreaView>
    )
})

export default Footer;
