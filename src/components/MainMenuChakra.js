import {
    Box,
    Flex,
    Link as ChLink,
    useDisclosure,
    useColorModeValue,
    Stack,
    useColorMode,
    Image,
    Text,
    HStack,
} from '@chakra-ui/react';
import SLink from './widgets/SLink';
import fs from 'flatstore';
import NavForGuest from './login/NavForGuest';
import NavForUser from './login/NavForUser';
import { useHistory, Link, useParams, withRouter } from 'react-router-dom';
import config from '../config'
import { getRoomStatus } from '../actions/room';


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
    let params = useParams();

    const { colorMode, toggleColorMode } = useColorMode();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const room_slug = params?.room_slug;
    const roomStatus = getRoomStatus();
    // updateHistory();
    // let urlPath = this.props.location.pathname;
    // let classFindGames = '';
    // if (urlPath == '/' || urlPath.includes('/g')) {
    //     classFindGames = 'active';
    // }

    const loggedIn = props.loggedIn;

    return (
        <>

            <Box
                zIndex="10"
                filter={room_slug ? 'blur(20px)' : 'blur(0)'}
                display={'block'}
                bg={useColorModeValue('gray.100', 'gray.900')}
                px={4}
                transition={'all 0.3s ease-in'}

            >
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <HStack>
                        <Box
                        ><Link to="/" className="">
                                <Image
                                    alt={'A cup of skill logo'}
                                    src={`${config.https.cdn}acos-logo-combined.png`}
                                    w="154.2px" h="64px"
                                />

                            </Link>
                        </Box>
                        {/* <Link to="/" className=""><Text>ACOS Games</Text></Link> */}
                    </HStack>
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

export default fs.connect(['loggedIn'])(withRouter(MainMenuChakra));