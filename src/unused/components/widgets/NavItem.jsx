import React from 'react'
import {
    Flex,
    Text,
    Icon,
    Link as CLink,
    Menu,
    MenuButton,
    MenuList,
    HStack
} from '@chakra-ui/react'
import NavHoverBox from './NavHoverBox'
import SLink from './SLink'
import { Link, useLocation } from 'react-router-dom';

function NavItem({ icon, url, title, description, active, navSize, isExternal }) {
    active = false;
    let location = useLocation();
    let urlPath = location.pathname;
    if (urlPath == url)
        active = true;

    return (
        <Flex
            mt={0}
            flexDir="column"
            w="100%"
            alignItems={['center', 'center', 'flex-start']}

            gap="0"
        >
            <Menu placement="right">
                <CLink
                    as={!isExternal ? SLink : CLink}
                    backgroundColor={active ? "gray.700" : 'gray.1200'}
                    p={3}
                    _hover={{ textDecor: 'none', backgroundColor: "gray.800", color: 'gray.150' }}
                    w={[null, null, '100%']}
                    to={!isExternal ? url : undefined}
                    href={isExternal ? url : undefined}
                    isExternal={isExternal}
                >
                    <MenuButton w="100%">
                        <HStack spacing="1rem">
                            <Icon as={icon} fontSize="sm" color={active ? "gray.100" : "gray.100"} />
                            <Text
                                ml={2}
                                display={['none', 'none', 'flex']}
                                color={active ? "gray.100" : "gray.100"}
                                _hover={{ color: "gray.150" }}
                                fontSize="xs"
                            >
                                {title}
                            </Text>
                        </HStack>
                    </MenuButton>
                </CLink>
            </Menu>
        </Flex>
    )
}

export default NavItem;