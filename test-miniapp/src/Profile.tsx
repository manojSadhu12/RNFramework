import {Button, Text, View} from "native-base";
import React, {useEffect} from "react";
import Router from "@superlit/routing";
import {navigator} from "../routes";
import Footer from "./Footer";

const Title: React.FC<{title: string}> = React.memo(({title}) => <Text>{title}</Text>);

const Profile = () => {
    const ref =  React.useRef(0)
    const back = navigator.useBack()
    const {params, optionalParams} = navigator.getRouteData("Profile", "Profile/ChildPage/nChildPage1");

    ref.current++;

    useEffect(() => {
        console.log("Profile loaded")
    }, [])

    return (
        <View flex={1}>
            <View flex={1} alignItems={"center"}>
                <Title title={''+ref.current}></Title>
                <Button onPress={back}>Back</Button>

                <Router.Outlet/>
            </View>
            <Footer/>
        </View>
    );
}

export default Profile;
