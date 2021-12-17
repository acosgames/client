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
    Link,
    Center
} from '@chakra-ui/react'

import { FiHome } from "@react-icons/all-files/fi/FiHome";
import { IoDocuments } from "@react-icons/all-files/io5/IoDocuments";
import { IoLogoGithub } from "@react-icons/all-files/io5/IoLogoGithub";
import { FaDiscord } from "@react-icons/all-files/fa/FaDiscord";

// import { IoDocuments, IoLogoGithub, FiHome, FaDiscord } from '@react-icons'
import { PlusSquareIcon } from '@chakra-ui/icons'

import NavItem from './NavItem'
import { withRouter } from 'react-router'

import fs from 'flatstore';


function Sidebar() {
    const [navSize, changeNavSize] = useState("large")

    let userProfile = fs.get('user');


    return (
        <Flex
            pos="sticky"
            left="0"
            h="100%"
            marginTop="0"
            id="wrapper-sidebar"
            // boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
            // borderRadius={navSize == "small" ? "15px" : "30px"}
            w={['75px', '75px', '200px']}
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
                <NavItem url="/dev" icon={FiHome} title="My Games" description="This is the description for the dashboard." />
                <NavItem url="/dev/game/create" icon={PlusSquareIcon} title="Create Game" active />
                <NavItem url="/docs" icon={IoDocuments} title="Documentation" />


                {/* <NavItem navSize={navSize} icon={FiUser} title="Clients" />
                <NavItem navSize={navSize} icon={IoPawOutline} title="Animals" />
                <NavItem navSize={navSize} icon={FiDollarSign} title="Stocks" />
                <NavItem navSize={navSize} icon={FiBriefcase} title="Reports" />
                <NavItem navSize={navSize} icon={FiSettings} title="Settings" /> */}

                <Divider display={['none', 'none', 'flex']} />
                <Flex mt={4} align="center">
                    <Avatar size="sm" src="avatar-1.jpg" />
                    <Flex flexDir="row" ml={4} display={['none', 'none', 'flex']}>
                        <VStack align="start" spacing="0">
                            <Heading as="h3" size="sm">{userProfile?.displayname}</Heading>
                            <Text color="gray">Admin</Text>
                        </VStack>

                    </Flex>
                </Flex>
                {userProfile && userProfile.github && (
                    <>
                        <Divider mt="10px" mb="10px" />
                        <Center w="100%" >
                            <Link textDecoration={"none"} href={`https://github.com/${userProfile?.github}`} >
                                <VStack align="center">
                                    <Icon as={IoLogoGithub} fontSize="24" />
                                    {userProfile && (<Text display={['none', 'none', 'flex']}>@{userProfile?.github}</Text>)}
                                </VStack>
                            </Link>
                        </Center>
                    </>
                )}
                <Divider mt="10px" mb="10px" />
                <Center w="100%" >
                    <Link textDecoration={"none"} target="_blank" href={'https://discord.gg/ydHkCcNgHD'} >
                        <VStack align="center">
                            <Icon as={FaDiscord} fontSize="24" />
                            <Text align="center">Questions? <br />Join us on Discord</Text>
                        </VStack>
                    </Link>
                </Center>

            </Flex>
        </Flex >
    )
}


export default withRouter(fs.connect(['user'])(Sidebar));