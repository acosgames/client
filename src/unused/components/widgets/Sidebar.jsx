import React, { useState } from 'react'
import {
    Flex,
    Text,
    IconButton,
    Icon,
    Divider,
    Avatar,
    Heading,
    Spacer,
    HStack,
    VStack,
    Box,
    Link as ChLink,
    Center
} from '@chakra-ui/react'


import { IoDocuments, IoLogoGithub, FiHome, FaDiscord } from '@react-icons'
import { PlusSquareIcon } from '@chakra-ui/icons'

import NavItem from './NavItem'

import fs from 'flatstore';


function Sidebar(props) {
    const [navSize, changeNavSize] = useState("large")

    let [userProfile] = fs.useWatch('user');
    // let userProfile = fs.get('user');


    return (
        <Flex
            pos="sticky"
            left="0"
            pt="4rem"
            h="100%"
            marginTop="0"
            id="wrapper-sidebar"
            bgColor={'gray.1200'}
            // boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
            // borderRadius={navSize == "small" ? "15px" : "30px"}
            w={['4rem', '4rem', '18rem']}
            flexDir="column"
            justifyContent="space-between"
        >
            <Flex
                p="0"
                flexDir="column"
                w="100%"
                alignItems={['center', 'center', 'flex-start']}
                as="nav"
            >
                {/* <IconButton
                    background="none"
                    mt={5}
                    _hover={{ background: 'none' }}
                    icon={<FiMenu />}
                    onClick={() => {
                        if (navSize == "small")
                            changeNavSize("large")
                        else
                            changeNavSize("small")
                    }}
                /> */}
                <NavItem fontSize='20' url="/dev" icon={FiHome} title="My Games" description="This is the description for the dashboard." />
                <NavItem fontSize='20' url="/dev/game/create" icon={PlusSquareIcon} title="Create Game" active />
                <NavItem fontSize='20' url="https://sdk.acos.games" icon={IoDocuments} title="Documentation" isExternal={true} />


                {/* <NavItem navSize={navSize} icon={FiUser} title="Clients" />
                <NavItem navSize={navSize} icon={IoPawOutline} title="Animals" />
                <NavItem navSize={navSize} icon={FiDollarSign} title="Stocks" />
                <NavItem navSize={navSize} icon={FiBriefcase} title="Reports" />
                <NavItem navSize={navSize} icon={FiSettings} title="Settings" /> */}

                {/* <Divider display={['none', 'none', 'flex']} />
                <Flex mt={4} align="center">
                    <Avatar size="sm" src="avatar-1.jpg" />
                    <Flex flexDir="row" ml={4} display={['none', 'none', 'flex']}>
                        <VStack align="start" spacing="0">
                            <Heading as="h3" size="sm" fontWeight={'light'}>{userProfile?.displayname}</Heading>
                            <Text color="gray" fontWeight={'light'}>Admin</Text>
                        </VStack>

                    </Flex>
                </Flex> */}
                {userProfile && userProfile.github && (
                    <>
                        <Divider mt="10px" mb="10px" />
                        <Center w="100%" >
                            <ChLink isExternal textDecoration={"none"} href={`https://github.com/${userProfile?.github}`} >
                                <VStack align="center">
                                    <Icon as={IoLogoGithub} fontSize="20" />
                                    {userProfile && (<Text display={['none', 'none', 'flex']} fontSize="2xs" fontWeight={'bold'}>@{userProfile?.github}</Text>)}
                                </VStack>
                            </ChLink>
                        </Center>
                    </>
                )}
                <Divider mt="10px" mb="10px" />
                <Center w="100%" >
                    <ChLink isExternal textDecoration={"none"} target="_blank" href={'https://discord.gg/ydHkCcNgHD'} >
                        <VStack align="center">
                            <Icon as={FaDiscord} fontSize="20" />
                            <Text display={['none', 'none', 'block']} fontSize="2xs" fontWeight={'bold'} align="center">Discord</Text>
                        </VStack>
                    </ChLink>
                </Center>

            </Flex>
        </Flex >
    )
}


export default Sidebar;