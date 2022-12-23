import { Divider, Flex, HStack, Icon, Link as ChLink, Spacer, Text, VStack } from "@chakra-ui/react";
import { FaDiscord, FaDev, FaGithub, TiDocumentText } from '@react-icons';

import fs from 'flatstore';
import { useEffect } from "react";
import { getPlayer } from "../../actions/person";
import ProfileDev from "./ProfileDev";
import ProfileRanks from "./ProfileRanks";


function Profile(props) {


    const local = fs.get('user');
    const displayname = props?.match?.params?.displayname;
    let isLocal = !displayname || local?.displayname == displayname
    useEffect(() => {
        if (!isLocal) {
            let curProfile = fs.get('profile');
            if (curProfile && curProfile.displayname == displayname)
                return;
            getPlayer(displayname)
        }
        else {
            let curProfile = fs.get('profile');
            if (curProfile && curProfile.displayname == local.displayname)
                return;
            fs.set('profile', local);
        }
    })


    let user = props.profile;
    if (!user)
        return <></>
    return (
        <VStack w="100%" spacing="2rem">
            <Flex spacing="2rem" justifyContent={'space-between'} w="100%" alignItems={'center'}>

                <Text color='gray.300' fontWeight={'300'} fontSize="xs">Member since {user.membersince}</Text>
                <Spacer />
                <Text fontSize="xl">{user.displayname}</Text>
                <Spacer />

                <Text
                    display={user.isdev ? 'block' : 'none'}
                    fontSize="lg"
                    color="white"
                >
                    <ChLink isExternal href={"https://github.com/" + user.github}>
                        <Icon
                            as={FaGithub}
                        />
                    </ChLink>
                </Text>

            </Flex>
            <Divider />
            <ProfileRanks ranks={user.ranks} />
            <Divider display={user.devgames ? 'block' : 'none'} />
            <ProfileDev devgames={user.devgames || []} />
        </VStack>
    )

}

export default fs.connect(['profile'])((Profile));
