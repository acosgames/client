import {
    Box,
    Flex,
    Link,
    useDisclosure,
    useColorModeValue,
    Stack,
    useColorMode,
} from '@chakra-ui/react';
import SLink from './widgets/SLink';
import fs from 'flatstore';
import NavForGuest from './login/NavForGuest';
import NavForUser from './login/NavForUser';
import { useHistory } from 'react-router-dom';


const NavLink = ({ children }) => (
    <Link
        px={2}
        py={1}
        rounded={'md'}
        _hover={{
            textDecoration: 'none',
            bg: useColorModeValue('gray.200', 'gray.700'),
        }}
        href={'#'}>
        {children}
    </Link>
);

function MainMenuChakra() {

    const updateHistory = () => {
        let history = fs.get('pagehistory');
        history.push(Object.assign({}, this.props.location));

        if (history.length > 20) {
            history = history.splice(history.length - 21);
        }

        fs.set('pagehistory', history);
    }

    const { colorMode, toggleColorMode } = useColorMode();
    const { isOpen, onOpen, onClose } = useDisclosure();

    // updateHistory();
    // let urlPath = this.props.location.pathname;
    // let classFindGames = '';
    // if (urlPath == '/' || urlPath.includes('/g')) {
    //     classFindGames = 'active';
    // }

    const history = useHistory();
    const user = fs.get('user');

    return (
        <>
            <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <Box><SLink to="/g" className="">
                        <span className="logo-txt">FSG</span>
                        {/* <span className="material-icons">
                                home
                            </span> */}
                    </SLink></Box>

                    <Flex alignItems={'center'}>
                        <Stack direction={'row'} spacing={7}>
                            {/* <Button onClick={toggleColorMode}>
                                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                            </Button> */}

                            {user && <NavForUser />}
                            {!user && <NavForGuest />}

                        </Stack>
                    </Flex>
                </Flex>
            </Box>
        </>
    );
}

export default fs.connect(['user'])(MainMenuChakra);