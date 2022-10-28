import {FC} from "react";
import {HStack, Text, useTheme} from "native-base";
// import { MaterialCommunityIcons, MaterialIcons } from 'react-native-vector-icons';

const AppBar: FC<{ title: string }> = ({title}) => {
    const theme = useTheme();

    return <>
        <HStack bg={theme.colors.primary["500"]} px="2" py="3" justifyContent="space-between" alignItems="center"
                w="full">
            <HStack alignItems="center">
                <Text color="white" fontSize="20">
                    {title}
                </Text>
            </HStack>
        </HStack>
    </>;
}

export default AppBar