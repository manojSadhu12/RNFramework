import {Center, Text} from "native-base";
import React from "react";
import Router from "@superlit/routing";

const ChildPage = (props: any) => {
    // const data = Routing.useRouteData()
    // console.log(data);

    // const route = useParams();
    // console.log("c:::", JSON.stringify(route));

    Router.useFocus(() => {
        console.log("ChildPage2", "Focussed")
    })

    Router.useUnFocus(() => {
        // console.log("ChildPage2", "unFocussed")
    })

    return (
        <Center>
            <Text>I am child page2</Text>
            {/*<Router.Outlet>
            </Router.Outlet>*/}
        </Center>
    );
}

export default ChildPage