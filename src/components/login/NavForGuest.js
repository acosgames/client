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
    VStack,
    IconButton
} from '@chakra-ui/react'

import fs from 'flatstore';
import SLink from '../widgets/SLink';


import { FiUser, FiLogOut } from '@react-icons';
import { Link, useHistory } from 'react-router-dom';

function NavForGuest(props) {

    const history = useHistory();

    return (

        <Menu placement='bottom-end'>
            <VStack display="flex" justifyContent="center" height="100%" spacing="0">
                <MenuButton
                    as={IconButton}
                    rounded={'full'}
                    icon={<FiUser size="3rem" />}
                    // variant={'link'}
                    cursor={'pointer'}
                    height="100%"
                    minW={0} >

                </MenuButton>
            </VStack>
            <MenuList alignItems={'center'} boxShadow={'0 4px 8px rgba(0,0,0,0.4),0 0px 4px rgba(0,0,0,0.4)'} border="0" borderRadius="8px">
                {/* <Link to="/login"> */}
                <MenuItem
                    onClick={() => {
                        // history.push('/login') 
                        fs.set('loginFrom', 'signin');
                        fs.set('isCreateDisplayName', true);

                    }}
                    fontSize="xs"
                    fontWeight="400"
                >
                    <Icon as={FiLogOut} mr="0.5rem" /> Sign In
                </MenuItem>
                {/* </Link> */}
            </MenuList>
        </Menu>
    )
}

export default fs.connect(['user'])(NavForGuest);