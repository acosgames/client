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
import { useHistory } from 'react-router-dom';
function NavForUser(props) {

    const history = useHistory();

    return (

        <Menu>
            <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                <Avatar
                    size={'sm'}
                    src={'https://avatars.dicebear.com/api/male/username.svg'}
                />
            </MenuButton>
            <MenuList alignItems={'center'}>
                <br />
                <Center>
                    <Avatar
                        size={'2xl'}
                        src={'https://avatars.dicebear.com/api/male/username.svg'}
                    />
                </Center>
                <br />
                <Center>
                    <p>{props?.user?.displayname}</p>
                </Center>
                <br />
                <MenuDivider />
                <MenuItem>
                    <SLink to="/dev">
                        Developer Zone
                    </SLink>
                </MenuItem>
                <MenuItem>
                    <SLink to="/profile">
                        Account Settings
                    </SLink>
                </MenuItem>
                <MenuItem onClick={async () => {
                    let success = await logout();
                    if (success) {
                        history.push('/');

                    }
                }}>Logout</MenuItem>
            </MenuList>
        </Menu>
    )
}

export default fs.connect(['user'])(NavForUser);