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
import {
    FiMenu,
    FiHome,
    FiGithub,
    FiExternalLink
} from 'react-icons/fi'
import { IoLogoGithub, IoPawOutline } from 'react-icons/io5'
import NavItem from './NavItem'
import { withRouter } from 'react-router'
import { PlusSquareIcon } from '@chakra-ui/icons'
import fs from 'flatstore';

function Sidebar() {
    const [navSize, changeNavSize] = useState("large")

    let userProfile = fs.get('user');


    return (
        <Flex
            pos="sticky"
            left="0"
            h="95vh"
            marginTop="0"
            id="wrapper-sidebar"
            // boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
            // borderRadius={navSize == "small" ? "15px" : "30px"}
            w={navSize == "small" ? "75px" : "200px"}
            flexDir="column"
            justifyContent="space-between"
        >
            <Flex
                p="0"
                flexDir="column"
                w="100%"
                alignItems={navSize == "small" ? "center" : "flex-start"}
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
                <NavItem url="/dev" navSize={navSize} icon={FiHome} title="My Games" description="This is the description for the dashboard." />
                <NavItem url="/dev/game/create" navSize={navSize} icon={PlusSquareIcon} title="Create Game" active />
                {/* <NavItem navSize={navSize} icon={FiUser} title="Clients" />
                <NavItem navSize={navSize} icon={IoPawOutline} title="Animals" />
                <NavItem navSize={navSize} icon={FiDollarSign} title="Stocks" />
                <NavItem navSize={navSize} icon={FiBriefcase} title="Reports" />
                <NavItem navSize={navSize} icon={FiSettings} title="Settings" /> */}

                <Divider display={navSize == "small" ? "none" : "flex"} />
                <Flex mt={4} align="center">
                    <Avatar size="sm" src="avatar-1.jpg" />
                    <Flex flexDir="row" ml={4} display={navSize == "small" ? "none" : "flex"}>
                        <VStack align="start" spacing="0">
                            <Heading as="h3" size="sm">{userProfile?.displayname}</Heading>
                            <Text color="gray">Admin</Text>
                        </VStack>

                    </Flex>
                </Flex>
                <Divider mt="10px" mb="10px" />
                <Center w="100%" >
                    <Link href={`https://github.com/${userProfile?.github}`} >
                        <HStack>
                            <Icon as={IoLogoGithub} fontSize="24" />
                            {userProfile && (<Text>@{userProfile?.github}</Text>)}
                        </HStack>
                    </Link>
                </Center>
            </Flex>
        </Flex >
    )
}


export default withRouter(fs.connect(['user'])(Sidebar));