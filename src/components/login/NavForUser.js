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
    Text
} from '@chakra-ui/react'

import { IoHammer, ImUser, FiLogOut } from '@react-icons';

import fs from 'flatstore';
import SLink from '../widgets/SLink';
import { logout } from '../../actions/person';
import { useHistory, Link } from 'react-router-dom';
function NavForUser(props) {

    const history = useHistory();


    return (

        <Menu modifiers={{ name: 'eventListeners', options: { scroll: false } }}>
            <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                <Avatar
                    name={props?.user?.displayname}
                    width={['2.2rem', '2.6rem', '4rem']}
                    height={['2.2rem', '2.6rem', '4rem']}
                    bgColor={'gray.300'}
                />
            </MenuButton>
            <MenuList alignItems={'center'} boxShadow={'0 4px 8px rgba(0,0,0,0.4),0 0px 4px rgba(0,0,0,0.4)'} border="0" borderRadius="8px">
                {/* <br />
                <Center>
                    <Link to="/profile">
                        <Avatar
                            name={props?.user?.displayname}
                            size={'2xl'}
                            bgColor={'gray.300'}

                        />
                    </Link>
                </Center> */}
                <Center>
                    <Link to="/profile"><Text fontSize="xs">{props?.user?.displayname}</Text></Link>
                </Center>
                <MenuDivider color="blacks.700" />
                <Link to="/dev" width="100%">
                    <MenuItem fontSize="xxs" fontWeight="400">
                        <Icon as={IoHammer} mr="0.5rem" /> Developer Zone
                    </MenuItem>
                </Link>
                <Link to="/profile" width="100%">
                    <MenuItem fontSize="xxs" fontWeight="400">
                        <Icon as={ImUser} mr="0.5rem" />Profile
                    </MenuItem>
                </Link>
                <MenuDivider color="blacks.700" />
                <Logout />

                <LoginTempUser />
            </MenuList>
        </Menu>
    )
}

function Logout(props) {
    let user = fs.get('user');
    if (!user)
        return <></>

    let isTempUser = !user.email || user.email.length == 0;
    if (!isTempUser)
        return (
            // <Link to="/logout" width="100%">
            <MenuItem onClick={() => { logout() }} fontSize="xs" fontWeight="400"><Icon as={FiLogOut} mr="0.5rem" />Logout</MenuItem>
            // </Link>
        )

    return (
        <>
            <MenuDivider />
            {/* <Link to="/logout" width="100%"> */}
            <MenuItem onClick={() => { logout() }} fontSize="xs" fontWeight="400"><Icon as={FiLogOut} mr="0.5rem" />Sign out and delete</MenuItem>
            {/* </Link> */}
        </>

    )
}

function LoginTempUser(props) {

    let user = fs.get('user');
    if (!user)
        return <></>

    let isTempUser = !user.email || user.email.length == 0;
    if (!isTempUser)
        return <></>

    return (
        <Link to="/login" width="100%">
            <MenuItem>Sign in and save</MenuItem>
        </Link>
    )
}

export default fs.connect(['user'])(NavForUser);