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
import { logout } from '../../actions/person';
import { useHistory, Link } from 'react-router-dom';
function NavForUser(props) {

    const history = useHistory();


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
                    <Link to="/profile">
                        <Avatar
                            name={props?.user?.displayname}
                            size={'2xl'}

                        />
                    </Link>
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
                        Profile
                    </MenuItem>
                </Link>
                <MenuDivider />
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
            <Link to="/logout" width="100%">
                <MenuItem>Logout</MenuItem>
            </Link>
        )

    return (
        <>
            <MenuDivider />
            <Link to="/logout" width="100%">
                <MenuItem>Sign out and delete</MenuItem>
            </Link>
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