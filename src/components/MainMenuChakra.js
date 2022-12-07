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
    Icon,
    VStack,
    Button,
} from '@chakra-ui/react';
import SLink from './widgets/SLink';
import fs from 'flatstore';
import NavForGuest from './login/NavForGuest';
import NavForUser from './login/NavForUser';
import { useHistory, Link, useParams, withRouter } from 'react-router-dom';
import config from '../config'
import { findGamePanelByRoom, getPrimaryGamePanel, getRoomStatus, minimizeGamePanel } from '../actions/room';
import { IoSend, CgChevronDoubleRightR, CgChevronDoubleDownR, CgChevronDoubleUpR, BsBoxArrowDown, IoChatbubbleEllipsesSharp, CgChevronDoubleLeftR } from '@react-icons';
import GameActions from './games/GameDisplay/GameActions';
import { decodeReplay, downloadReplay } from '../actions/connection';
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

    let [primaryGamePanelId] = fs.useWatch('primaryGamePanel');

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
    // const roomStatus = getRoomStatus();
    // updateHistory();
    // let urlPath = this.props.location.pathname;
    // let classFindGames = '';
    // if (urlPath == '/' || urlPath.includes('/g')) {
    //     classFindGames = 'active';
    // }

    const loggedIn = props.loggedIn;

    const gamepanel = findGamePanelByRoom(room_slug);
    const isPrimary = getPrimaryGamePanel() != gamepanel;
    return (
        <>

            <Box
                zIndex="20"
                filter={room_slug ? 'blur(20px)' : 'blur(0)'}
                display={'flex'}
                // px={'1rem'}
                // px={4}
                transition={'filter 0.3s ease-in'}
                width="100%"
                maxWidth="1200px"
                h={['3rem', '4rem', '5rem']}
                justifyContent={'center'}
            // alignContent={'center'}
            // justifyItems={'center'}
            // alignItems={'center'}
            >
                <Flex alignItems={'center'} justifyContent={'space-between'} h={['3rem', '4rem', '5rem']} width="100%" maxW={['1200px']}>
                    <HStack spacing={['2rem', '2rem', "4rem"]} justifyContent={'center'}>
                        <Box
                        ><Link to="/" className="" onClick={(e) => {
                            if (isPrimary)
                                e.preventDefault();
                            minimizeGamePanel()
                        }}>
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
                    <Box w="100%" h="100%">
                        <QueuePanel />

                    </Box>
                    <Flex alignItems={'center'} height="100%">
                        <Stack direction={'row'} spacing={0} height="100%">
                            {/* <Button onClick={toggleColorMode}>
                                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                            </Button> */}
                            <Box>
                                {(loggedIn != 'LURKER') && <NavForUser />}
                                {(loggedIn == 'LURKER') && <NavForGuest />}
                            </Box>
                            <Box p="0" m="0" height="100%" lineHeight={'100%'}>
                                <Button onClick={() => { fs.set('chatToggle', !fs.get('chatToggle')) }} height="100%">
                                    <Icon
                                        as={props.isMobile ? (props.chatToggle ? CgChevronDoubleDownR : CgChevronDoubleUpR) : (props.chatToggle ? CgChevronDoubleRightR : CgChevronDoubleLeftR)}
                                        // filter={'drop-shadow(0px -12px 24px rgba(0,0,0,0.2))'}
                                        fontSize="2.5rem"
                                        color={'gray.100'} />
                                </Button>
                            </Box>

                            {/* <Box p="0" m="0" height="100%" lineHeight={'100%'}>
                                <Button onClick={async () => {

                                    let jsonStr = await downloadReplay('test');
                                    let json = decodeReplay(jsonStr);

                                }} height="100%">
                                    <Icon as={IoSend} filter={'drop-shadow(0px -12px 24px rgba(0,0,0,0.2))'} fontSize="2rem" color={'white'} />
                                </Button>
                            </Box> */}

                        </Stack>
                    </Flex>
                </Flex >
            </Box >
        </>
    );
}

export default fs.connect(['loggedIn', 'chatToggle', 'isMobile'])(withRouter(MainMenuChakra));