import React from 'react'
import {
    Center,
    Avatar,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Button,
    Icon,
    chakra
} from '@chakra-ui/react'

import fs from 'flatstore';
import SLink from '../widgets/SLink';
import { logout } from '../../actions/person';
import { useHistory, Link } from 'react-router-dom';
function NavForUser(props) {

    const history = useHistory();

    const ChakraSLink = chakra(SLink)

    return (

        <Menu placement='right-start' modifiers={{ name: 'eventListeners', options: { scroll: false } }}>
            <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                <Avatar
                    name={props?.user?.displayname}
                    size={'sm'}
                />
            </MenuButton>
            <MenuList alignItems={'center'}>
                <br />
                <Center>
                    <Avatar
                        name={props?.user?.displayname}
                        size={'2xl'}

                    />
                </Center>
                <br />
                <Center>
                    <p>{props?.user?.displayname}</p>
                </Center>
                <br />
                <MenuDivider />
                <Link to="/dev" width="100%">
                    <MenuItem>
                        Developer Zone
                    </MenuItem>
                </Link>
                <Link to="/profile" width="100%">
                    <MenuItem >
                        Account Settings
                    </MenuItem>
                </Link>
                <Link to="/logout" width="100%">
                    <MenuItem>Logout</MenuItem>
                </Link>
            </MenuList>
        </Menu>
    )
}

export default fs.connect(['user'])(NavForUser);