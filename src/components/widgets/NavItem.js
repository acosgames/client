import React from 'react'
import {
    Flex,
    Text,
    Icon,
    Link,
    Menu,
    MenuButton,
    MenuList
} from '@chakra-ui/react'
import NavHoverBox from './NavHoverBox'
import SLink from './SLink'
import { withRouter } from 'react-router';

function NavItem({ location, icon, url, title, description, active, navSize }) {
    active = false;
    let urlPath = location.pathname;
    if (urlPath == url)
        active = true;

    return (
        <Flex
            mt={0}
            flexDir="column"
            w="100%"
            alignItems={navSize == "small" ? "center" : "flex-start"}
        >
            <Menu placement="right">
                <Link
                    as={SLink}
                    backgroundColor={active && "#2b3549"}
                    p={3}
                    _hover={{ textDecor: 'none', backgroundColor: "#2b3549" }}
                    w={navSize == "large" && "100%"}
                    to={url}
                >
                    <MenuButton w="100%">
                        <Flex>
                            <Icon as={icon} fontSize="xl" color={active ? "#82AAAD" : "gray.500"} />
                            <Text ml={2} display={navSize == "small" ? "none" : "flex"}>{title}</Text>
                        </Flex>
                    </MenuButton>
                </Link>
            </Menu>
        </Flex>
    )
}

export default withRouter(NavItem)