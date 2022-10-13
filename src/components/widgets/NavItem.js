import React from 'react'
import {
    Flex,
    Text,
    Icon,
    Link as CLink,
    Menu,
    MenuButton,
    MenuList
} from '@chakra-ui/react'
import NavHoverBox from './NavHoverBox'
import SLink from './SLink'
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

function NavItem({ location, icon, url, title, description, active, navSize, isExternal }) {
    active = false;
    let urlPath = location.pathname;
    if (urlPath == url)
        active = true;

    return (
        <Flex
            mt={0}
            flexDir="column"
            w="100%"
            alignItems={['center', 'center', 'flex-start']}
        >
            <Menu placement="right">
                <CLink
                    as={!isExternal ? SLink : CLink}
                    backgroundColor={active ? "gray.700" : 'gray.900'}
                    p={3}
                    _hover={{ textDecor: 'none', backgroundColor: "gray.800", color: 'gray.150' }}
                    w={[null, null, '100%']}
                    to={!isExternal ? url : undefined}
                    href={isExternal ? url : undefined}
                    isExternal={isExternal}
                >
                    <MenuButton w="100%">
                        <Flex>
                            <Icon as={icon} fontSize="xl" color={active ? "gray.100" : "gray.100"} />
                            <Text
                                ml={2}
                                display={['none', 'none', 'flex']}
                                color={active ? "gray.100" : "gray.100"}
                                _hover={{ color: "gray.150" }}
                            >
                                {title}
                            </Text>
                        </Flex>
                    </MenuButton>
                </CLink>
            </Menu>
        </Flex>
    )
}

export default withRouter(NavItem)