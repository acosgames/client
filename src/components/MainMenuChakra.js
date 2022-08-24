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
    VStack,
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
                zIndex="99"
                filter={room_slug ? 'blur(20px)' : 'blur(0)'}
                display={'block'}
                bg={useColorModeValue('acos.100', 'acos.100')}
                px={4}
                transition={'filter 0.3s ease-in'}
                width="100%"
                h={['3rem', '4rem', '5rem']}
            >
                <Flex alignItems={'center'} justifyContent={'space-between'} h={['3rem', '4rem', '5rem']}>
                    <HStack spacing={['2rem', '2rem', "4rem"]} justifyContent={'center'}>
                        <Box
                        ><Link to="/" className="">
                                <Image
                                    alt={'A cup of skill logo'}
                                    src={`${config.https.cdn}acos-logo-standalone4.png`}
                                    h={['1.8rem', '1.8rem', "3rem"]} maxHeight={'90%'}
                                />

                            </Link>
                        </Box>

                        {/* <Box mr={['1rem', '1rem', "2rem"]}>
                            <Link to="/" className=""><Text fontSize={['xs', 'sm', "lg"]} fontWeight="700">Browse</Text></Link>
                        </Box> */}
                    </HStack>
                    <Flex alignItems={'center'}>
                        <Stack direction={'row'} spacing={7}>
                            {/* <Button onClick={toggleColorMode}>
                                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                            </Button> */}
                            <Box>
                                {(loggedIn != 'LURKER') && <NavForUser />}
                                {(loggedIn == 'LURKER') && <NavForGuest />}
                            </Box>
                        </Stack>
                    </Flex>
                </Flex >
            </Box >
        </>
    );
}

export default fs.connect(['loggedIn'])(withRouter(MainMenuChakra));