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
                    backgroundColor={active && "#2b3549"}
                    p={3}
                    _hover={{ textDecor: 'none', backgroundColor: "#2b3549" }}
                    w={[null, null, '100%']}
                    to={!isExternal ? url : undefined}
                    href={isExternal ? url : undefined}
                    isExternal={isExternal}
                >
                    <MenuButton w="100%">
                        <Flex>
                            <Icon as={icon} fontSize="xl" color={active ? "#82AAAD" : "gray.500"} />
                            <Text ml={2} display={['none', 'none', 'flex']}>{title}</Text>
                        </Flex>
                    </MenuButton>
                </CLink>
            </Menu>
        </Flex>
    )
}

export default withRouter(NavItem)