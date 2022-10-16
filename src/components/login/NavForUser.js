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
    Text,
    VStack,
    AvatarBadge,
    Box,
    HStack
} from '@chakra-ui/react'

import { IoExitOutline, IoHammer, ImUser, AiOutlineDelete, BsBarChartFill, GiSaveArrow } from '@react-icons';

import fs from 'flatstore';
import SLink from '../widgets/SLink';
import { logout } from '../../actions/person';
import { useHistory, Link } from 'react-router-dom';
import { minimizeGamePanel } from '../../actions/room';
function NavForUser(props) {

    const history = useHistory();


    let latency = props.latency || 0;
    let latencyColor = 'green.300';
    if (latency > 400) {
        latencyColor = 'orange.300';
    }
    else if (latency > 200) {
        latencyColor = 'yellow.300';
    }

    if (!props.wsConnected || props.duplicatetabs) {
        latencyColor = 'red.500';
    }
    return (

        <Menu placement='bottom-end' modifiers={{ name: 'eventListeners', options: { scroll: false } }}>
            <VStack display="flex" justifyContent="center" height="100%" spacing="0">
                <MenuButton
                    as={Button}
                    className={'menuUserNav'}
                    rounded={'full'}
                    variant={'link'}
                    cursor={'pointer'}
                    minW={0}>
                    <Avatar
                        // name={props?.user?.displayname}
                        width={['2.5rem']}
                        height={['2.5rem']}
                    // bgColor={'blacks.300'}
                    >
                        <AvatarBadge bg={latencyColor} border="0" top={'1.2rem'} right={'2.2rem'} boxSize="1rem" />
                    </Avatar>
                </MenuButton>
            </VStack>
            <MenuList top={'-5rem'} alignItems={'center'} boxShadow={'0 4px 8px rgba(0,0,0,0.4),0 0px 4px rgba(0,0,0,0.4)'} border="0" borderRadius="8px">
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
                <Center p="1rem">
                    <Link to="/profile"><Text fontSize="md" color="gray.100">{props?.user?.displayname}</Text></Link>

                </Center>
                <HStack spacing="0.4rem" width="100%" justifyContent={'center'}>
                    <Icon as={BsBarChartFill} size="1.6rem" mr="1rem" color={latencyColor} />
                    <Text as="span" fontSize="xs" color={latencyColor}>{props.wsConnected ? (latency + 'ms') : props.duplicatetabs ? 'offline, dupe tabs' : 'offline'}</Text>
                </HStack>

                {/* <MenuDivider color="gray.500" /> */}
                <Link to="/dev" width="100%" onClick={(e) => { minimizeGamePanel() }}>
                    <MenuItem fontSize="sm" color="gray.100" fontWeight="400" px="2rem" py="1rem">
                        <Icon as={IoHammer} mr="1.5rem" fontSize="2rem" /> Developer Zone
                    </MenuItem>
                </Link>
                <Link to="/profile" width="100%" onClick={(e) => { minimizeGamePanel() }}>
                    <MenuItem fontSize="sm" color="gray.100" fontWeight="400" px="2rem" py="1rem">
                        <Icon as={ImUser} mr="1.5rem" fontSize="2rem" />Profile
                    </MenuItem>
                </Link>
                <MenuDivider color="gray.500" />
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
            <MenuItem onClick={() => { logout() }} color="gray.100" fontWeight="400" px="2rem" py="1rem"><Icon mr="1.5rem" as={IoExitOutline} color="gray.100" fontSize="2rem" />Logout</MenuItem>
            // </Link>
        )

    return (
        <>
            <MenuDivider />
            {/* <Link to="/logout" width="100%"> */}
            <MenuItem onClick={() => { logout() }} color="gray.100" fontWeight="400" px="2rem" py="1rem"><Icon mr="1.5rem" as={AiOutlineDelete} color="gray.100" fontSize="2rem" />Delete Account</MenuItem>
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
            <MenuItem color="gray.100" px="2rem" py="1rem"><Icon as={GiSaveArrow} color="gray.100" fontSize="2rem" mr="1.5rem" />Sign in and save</MenuItem>
        </Link>
    )
}

export default fs.connect(['user', 'latency', 'wsConnected', 'duplicatetabs'])(NavForUser);