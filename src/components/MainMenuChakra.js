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
// import SLink from './widgets/SLink';
import fs from 'flatstore';
import NavForGuest from './login/NavForGuest';
import NavForUser from './login/NavForUser';
import {
    Link,
    useLocation,
    //Link, 
    useParams,
} from 'react-router-dom';
import config from '../config'
import { findGamePanelByRoom, getPrimaryGamePanel, getRoomStatus, minimizeGamePanel } from '../actions/room';
// import { BsFillGearFill, AiFillLayout, IoSend, CgChevronDoubleRightR, CgChevronDoubleDownR, CgChevronDoubleUpR, BsBoxArrowDown, IoChatbubbleEllipsesSharp, CgChevronDoubleLeftR } from '@react-icons';
// import GameActions from './games/GameDisplay/GameActions';
// import { decodeReplay, downloadReplay } from '../actions/connection';
import QueuePanel from './games/QueuePanel';
// import Timeleft from './games/GameDisplay/Timeleft';
import ActionMenu from './chat/ActionMenu';



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
    let [displayMode] = fs.useWatch('displayMode');
    let [loggedIn] = fs.useWatch('loggedIn');
    let [chatToggle] = fs.useWatch('chatToggle');
    let [isMobile] = fs.useWatch('isMobile');

    let location = useLocation();

    const updateHistory = () => {
        let history = fs.get('pagehistory');
        history.push(Object.assign({}, location));

        if (history.length > 20) {
            history = history.splice(history.length - 21);
        }

        fs.set('pagehistory', history);
    }

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

    // const loggedIn = props.loggedIn;

    const gamepanel = getPrimaryGamePanel();
    // const isPrimary = getPrimaryGamePanel();http://localhost:8000/join/test-game-1+rank

    if (gamepanel && gamepanel.isPrimary && !gamepanel.available) {
        return <></>
    }
    return (
        <HStack
            // boxShadow={'0 10px 15px -3px rgba(0, 0, 0, .2), 0 4px 6px -2px rgba(0, 0, 0, .1);'}
            // boxShadow={'#0003 0 4px 6px -1px, #0000001f 0 2px 4px -1px'}
            spacing="0"
            w="100%"
            h={['4rem']}
            position={displayMode == 'theatre' ? 'absolute' : "relative"}
            top={displayMode == 'theatre' ? '-100rem' : '0'}
            zIndex="1000"
            justifyContent={'center'}
            // overflow="hidden"
            px={['0.5rem', '1rem', '5rem']}
            bgColor={'gray.800'}>

            <Box
                zIndex="1000"
                filter={room_slug ? 'blur(20px)' : 'blur(0)'}
                display={'flex'}
                // px={'1rem'}
                // px={4}
                transition={'filter 0.3s ease-in'}
                width="100%"
                maxWidth="1200px"
                h={['4rem']}
                justifyContent={'center'}
            // alignContent={'center'}
            // justifyItems={'center'}
            // alignItems={'center'}
            >
                <Flex alignItems={'center'} justifyContent={'space-between'} h={['4rem']} width="100%" maxW={['1200px']}>
                    <HStack spacing={['2rem', '2rem', "4rem"]} justifyContent={'center'}>


                        <Box
                        ><Link to="/" className="" onClick={(e) => {
                            if (gamepanel?.isPrimary)
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

                    <QueuePanel />

                    {/* <GameActions /> */}

                    {/* <Icon as={IoTimeOutline} fontSize='xxs' color={'gray.200'}></Icon> */}



                    <Flex alignItems={'center'} height="100%">
                        <Stack direction={'row'} spacing={0} height="100%">
                            {/* <Button onClick={toggleColorMode}>
                                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                            </Button> */}
                            <Box>
                                {(loggedIn != 'LURKER') && <NavForUser />}
                                {(loggedIn == 'LURKER') && <NavForGuest />}
                            </Box>
                            <Box p="0" pl="1rem" m="0" height="100%" lineHeight={'100%'}>
                                <ActionMenu />
                                {/*                             
                                <Button onClick={() => { fs.set('chatToggle', !fs.get('chatToggle')) }} height="100%">
                                    <Icon
                                        as={AiFillLayout}
                                        // filter={'drop-shadow(0px -12px 24px rgba(0,0,0,0.2))'}
                                        fontSize="2.5rem"
                                        color={'gray.100'} />
                                </Button> */}
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
        </HStack>
    );
}

export default MainMenuChakra