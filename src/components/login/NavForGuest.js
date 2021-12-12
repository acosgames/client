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
    Icon
} from '@chakra-ui/react'

import fs from 'flatstore';
import SLink from '../widgets/SLink';
import { FiLogIn, FiUser } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

function NavForGuest(props) {

    const history = useHistory();

    return (

        <Menu>
            <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                <Icon as={FiUser} fontSize="24" />
            </MenuButton>
            <MenuList alignItems={'center'}>

                <MenuItem onClick={() => { history.push('/login') }}>
                    Sign in
                </MenuItem>

            </MenuList>
        </Menu>
    )
}

export default fs.connect(['user'])(NavForGuest);