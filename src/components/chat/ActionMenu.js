import { Menu, MenuButton, MenuList, MenuItem, IconButton, MenuOptionGroup, MenuItemOption, MenuDivider, VStack, MenuGroup } from "@chakra-ui/react";
import fs from 'flatstore';
import { BsFillGearFill, AiFillLayout, IoCloseSharp, CgChevronDoubleRightR, CgChevronDoubleDownR, CgChevronDoubleUpR, BsBoxArrowDown, IoChatbubbleEllipsesSharp, CgChevronDoubleLeftR } from '@react-icons';
import { clearPrimaryGamePanel, clearRoom, getPrimaryGamePanel, getRoomStatus, setRoomForfeited } from "../../actions/room";
import { wsLeaveGame } from "../../actions/connection";



function ActionMenu(props) {

    let [layoutMode] = fs.useWatch('layoutMode');
    let [primaryGamePanelId] = fs.useWatch('primaryGamePanel');

    let gamepanel = getPrimaryGamePanel();

    if (!gamepanel)
        return <></>

    const room = gamepanel.room;
    const room_slug = room.room_slug;
    const game_slug = room.game_slug;
    const mode = room.mode;


    let gamestate = gamepanel.gamestate;// fs.get('gamestate') || {};//-events-gameover');
    let events = gamestate?.events || {};
    let roomStatus = getRoomStatus(room_slug);
    let isGameover = roomStatus == 'GAMEOVER' || roomStatus == 'NOSHOW' || roomStatus == 'ERROR' || !gamepanel.active;


    /* When the openFullscreen() function is executed, open the video in fullscreen.
    Note that we must include prefixes for different browsers, as they don't support the requestFullscreen method yet */
    const openFullscreen = (elem) => {
        if (!elem)
            return;
        elem = elem.current;
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) { /* Safari */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE11 */
            elem.msRequestFullscreen();
        }

        window.dispatchEvent(resizeEvent)
    }

    const onForfeit = (elem) => {

        fs.set('displayMode', 'none');
        if (isGameover) {
            // wsLeaveGame(game_slug, room_slug);
            clearRoom(room_slug);
            clearPrimaryGamePanel();
        }
        else {
            setRoomForfeited(room_slug);
            wsLeaveGame(game_slug, room_slug);
        }

    }

    return (
        <Menu zIndex="1001" placement='bottom-end' modifiers={[{ name: 'eventListeners', options: { scroll: false } }]}>
            <VStack display="flex" justifyContent="center" height="100%" spacing="0">
                <MenuButton
                    opacity={layoutMode == 'off' ? '0.5' : '1'}
                    as={IconButton}
                    aria-label='Options'
                    w="3.5rem" h="3.5rem"
                    icon={<BsFillGearFill w="3.5rem" h="3.5rem" />}
                    variant='none'
                />
            </VStack>
            <MenuList bgColor="blacks.100">

                <MenuOptionGroup
                    fontSize="sm"
                    bgColor="blacks.100"
                    defaultValue={layoutMode || 'right'}
                    title='Chat'
                    type='radio'
                    value={layoutMode}
                    onChange={(value) => {
                        fs.set('chatExpanded', true);
                        fs.set('scoreboardExpanded', true);

                        fs.set('layoutMode', value);
                    }}
                >
                    <MenuItemOption _hover={{ backgroundColor: 'blacks.500' }} _active={{ backgroundColor: 'blacks.300' }} bgColor="blacks.100" value='off' fontSize="xs" type="radio">Hide</MenuItemOption>
                    <MenuItemOption _hover={{ backgroundColor: 'blacks.500' }} _active={{ backgroundColor: 'blacks.300' }} bgColor="blacks.100" value='right' fontSize="xs" type="radio">Right side</MenuItemOption>
                    <MenuItemOption _hover={{ backgroundColor: 'blacks.500' }} _active={{ backgroundColor: 'blacks.300' }} bgColor="blacks.100" value='bottom' fontSize="xs" type="radio">Bottom</MenuItemOption>
                </MenuOptionGroup>
                <MenuDivider />

                <MenuGroup fontSize="sm" bgColor="blacks.100" title="Game">
                    <MenuItem _hover={{ backgroundColor: 'blacks.500' }} _active={{ backgroundColor: 'blacks.300' }} bgColor="blacks.100" icon={<IoCloseSharp w="2.5rem" h="2.5rem" />} fontSize="xs" onClick={() => { onForfeit() }}>
                        Forfeit
                    </MenuItem>

                </MenuGroup>

                {/* <MenuItem icon={<AddIcon />} command='⌘T'>
                    New Tab
                </MenuItem>
                <MenuItem icon={<ExternalLinkIcon />} command='⌘N'>
                    New Window
                </MenuItem>
                <MenuItem icon={<RepeatIcon />} command='⌘⇧N'>
                    Open Closed Tab
                </MenuItem>
                <MenuItem icon={<EditIcon />} command='⌘O'>
                    Open File...
                </MenuItem> */}
            </MenuList>
        </Menu>
    );
}

export default ActionMenu;