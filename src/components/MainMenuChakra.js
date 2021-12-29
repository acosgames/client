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
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { useHistory } from 'react-router-dom';

import QueuePanel from './games/QueuePanel';

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

function MainMenuChakra(props) {

    const updateHistory = () => {
        let history = fs.get('pagehistory');
        history.push(Object.assign({}, this.props.location));

        if (history.length > 20) {
            history = history.splice(history.length - 21);
        }

        fs.set('pagehistory', history);
    }

    const history = useHistory();

    const { colorMode, toggleColorMode } = useColorMode();
    const { isOpen, onOpen, onClose } = useDisclosure();

    // updateHistory();
    // let urlPath = this.props.location.pathname;
    // let classFindGames = '';
    // if (urlPath == '/' || urlPath.includes('/g')) {
    //     classFindGames = 'active';
    // }

    const loggedIn = props.loggedIn;

    return (
        <>
            <Box display={props.gamepanel ? 'none' : 'block'} bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <Box><SLink to="/" className="">
                        <span className="logo-txt">WDLeague</span>
                        {/* <span className="material-icons">
                                home
                            </span> */}
                    </SLink></Box>
                    <QueuePanel />
                    <Flex alignItems={'center'}>
                        <Stack direction={'row'} spacing={7}>
                            {/* <Button onClick={toggleColorMode}>
                                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                            </Button> */}
                            <Box>
                                {loggedIn && <NavForUser />}
                                {!loggedIn && <NavForGuest />}
                            </Box>
                        </Stack>
                    </Flex>
                </Flex>
            </Box>
        </>
    );
}

export default withRouter(fs.connect(['loggedIn', 'gamepanel'])(MainMenuChakra));