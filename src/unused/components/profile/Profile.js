import { Box, Divider, Flex, HStack, Icon, Link as ChLink, Spacer, Text, VStack } from "@chakra-ui/react";
import { FaDiscord, FaDev, FaGithub, TiDocumentText } from '@react-icons';

import fs from 'flatstore';
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPlayer } from "../../actions/person";
import ProfileDev from "./ProfileDev";
import ProfileRanks from "./ProfileRanks";


function Profile(props) {

    const params = useParams();
    let [profile] = fs.useWatch('profile');

    const local = fs.get('user');
    const displayname = params?.displayname;
    let isLocal = !displayname || local?.displayname == displayname
    useEffect(() => {

        if (profile?.displayname == params.displayname)
            return;

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
    }, [])



    if (fs.get('loadingProfile'))
        return <Box w='100%' textAlign={'center'} pt="2rem"><Text fontSize="sm">Loading...</Text></Box>

    if (!profile)
        return <Box w='100%' textAlign={'center'} pt="2rem"><Text fontSize="sm">Profile not found</Text></Box>


    return (
        <VStack w="100%" spacing="2rem">
            <Flex spacing="2rem" justifyContent={'space-between'} w="100%" alignItems={'center'}>

                <Text color='gray.300' fontWeight={'300'} fontSize="xs">Member since {profile.membersince}</Text>
                <Spacer />
                <Text fontSize="xl">{profile.displayname}</Text>
                <Spacer />

                <Text
                    display={profile.isdev ? 'block' : 'none'}
                    fontSize="lg"
                    color="white"
                >
                    <ChLink isExternal href={"https://github.com/" + profile.github}>
                        <Icon
                            as={FaGithub}
                        />
                    </ChLink>
                </Text>

            </Flex>
            <Divider />
            <ProfileRanks ranks={profile.ranks} />
            <Divider display={profile.devgames ? 'block' : 'none'} />
            <ProfileDev devgames={profile.devgames || []} />
        </VStack>
    )

}

export default Profile;
