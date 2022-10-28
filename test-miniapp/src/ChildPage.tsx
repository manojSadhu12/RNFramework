import {Center, Text} from "native-base";
import React, {useEffect, useRef, useState} from "react";
import Router from "@superlit/routing";

const ChildPage = (props: any) => {
    const ref = useRef(0)

    const [s, setS] = useState(0)

    Router.useFocus((isFirstFocus) => {
        ++ref.current
        console.log(isFirstFocus);
        if (isFirstFocus) {
            setInterval(() => {
                setS(s => ++s)
            }, 500)
        }
    })

    Router.useUnFocus(() => {
        // console.log("ChildPage", "unFocussed")
    })

    return (
        <Center>
            <Text>I am child page1</Text>
            <Text>{ref.current}::{s}</Text>
            {/*<Router.Outlet>
            </Router.Outlet>*/}
        </Center>
    );
}

export default ChildPage