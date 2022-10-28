import {Box, Button, HStack, Spacer, Text} from "native-base";
import {navigator} from "../routes";

const Home = () => {
    const navigate = navigator.useNavigate()

    return (
        <Box p={3} h={"full"}>
            <Text>Home Screen</Text>
            <HStack space={3}>
                <Button
                    onPress={() => {
                        navigate("Profile", {
                            userName1: "Manoj",
                            userId1: "43",
                        }, {
                            fromHome: true,
                            abc: true,
                        })
                    }}
                >
                    Open Profile
                </Button>
                <Spacer/>
                <Button
                    onPress={() => {
                        navigate("Profile/ChildPage2/nChildPage1", {
                            userName1: "Manoj",
                            userId1: "1",
                            userId2: "2",
                            userId3: "3",
                            userName2: "Jyothi Sadhu",
                            userName3: "Jathin",
                        }, {
                            abc: true,
                            fromHome: true,
                            ss: true,
                        })
                    }}
                >
                    Open Profile
                </Button>

            </HStack>


            {/*<TabNavigator>
                    <Tab.Screen name={"Home"} component={Profile}></Tab.Screen>
                    <Tab.Screen name={"Profile"} component={Profile}></Tab.Screen>
                </TabNavigator>*/}

        </Box>
    );
};

export default Home;
