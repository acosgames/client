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
    Box,
    IconButton
} from '@chakra-ui/react'

import fs from 'flatstore';
import SLink from '../widgets/SLink';


import { FiUser, FiLogOut } from '@react-icons';
import { Link, useHistory } from 'react-router-dom';

function NavForGuest(props) {

    const history = useHistory();

    return (
        <VStack display="flex" justifyContent="center" height="100%" spacing="0">
            <Button
                rounded={'full'}
                icon={<FiUser size="2rem" />}
                // variant={'link'}
                color="gray.50"
                boxShadow={`inset 0 1px 2px 0 rgb(255 255 255 / 20%), inset 0 2px 2px 0 rgb(0 0 0 / 28%), inset 0 0 3px 5px rgb(0 0 0 / 5%), 2px 2px 4px 0 rgb(0 0 0 / 25%)`}
                fontSize={'sm'}
                fontWeight="bold"
                p={['1rem', '1rem', '1.5rem']}
                bgColor='gray.700'
                _hover={{
                    bgColor: 'gray.600',
                    boxShadow: `inset 0 1px 2px 0 rgb(255 255 255 / 20%), inset 0 2px 2px 0 rgb(0 0 0 / 28%), inset 0 0 3px 5px rgb(0 0 0 / 5%), 2px 2px 4px 0 rgb(0 0 0 / 25%)`
                }}
                cursor={'pointer'}
                onClick={() => {
                    fs.set('loginFrom', 'signin');
                    fs.set('isCreateDisplayName', true);
                }}
                minW={0} >
                Sign In
            </Button>
        </VStack >
        // <Menu placement='bottom-end'>
        //     <VStack display="flex" justifyContent="center" height="100%" spacing="0">
        //         <MenuButton
        //             as={IconButton}
        //             rounded={'full'}
        //             icon={<FiUser size="3rem" />}
        //             // variant={'link'}
        //             cursor={'pointer'}
        //             height="100%"
        //             minW={0} >

        //         </MenuButton>
        //     </VStack>
        //     <MenuList alignItems={'center'} boxShadow={'0 4px 8px rgba(0,0,0,0.4),0 0px 4px rgba(0,0,0,0.4)'} border="0" borderRadius="8px">
        //         {/* <Link to="/login"> */}
        //         <MenuItem
        //             onClick={() => {
        //                 // history.push('/login') 
        //                 fs.set('loginFrom', 'signin');
        //                 fs.set('isCreateDisplayName', true);

        //             }}
        //             fontSize="xs"
        //             fontWeight="400"
        //         >
        //             <Icon as={FiLogOut} mr="0.5rem" /> Sign In
        //         </MenuItem>
        //         {/* </Link> */}
        //     </MenuList>
        // </Menu>
    )
}

export default fs.connect(['user'])(NavForGuest);