import * as React from 'react';
import {FC, PropsWithChildren} from 'react';
import {createNavigatorFactory, TabRouter as OutletRouter, useNavigationBuilder} from '@react-navigation/native';
import {View} from "native-base";

const OutletNavigator: FC<PropsWithChildren> = ({
                                                    children,
                                                }) => {
    const {state, navigation, descriptors, NavigationContent} =
        useNavigationBuilder(OutletRouter, {
            children,
            backBehavior: 'none'
        });

    return (
        <NavigationContent>
            {state.routes.map((route, index) => {
                const isFocused = state.index === index;

                return (
                    isFocused ?
                        <View key={route.key}>
                            {descriptors[route.key].render()}
                        </View>
                        : null
                );
            })}
        </NavigationContent>
    );
}


export const createMyNavigator = createNavigatorFactory(OutletNavigator);
export const OutletNav = createMyNavigator()

export default OutletNavigator