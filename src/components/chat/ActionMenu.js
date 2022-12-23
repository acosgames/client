import { Menu, MenuButton, MenuList, MenuItem, IconButton, MenuOptionGroup, MenuItemOption, MenuDivider, VStack } from "@chakra-ui/react";
import fs from 'flatstore';
import { BsFillGearFill, AiFillLayout, IoCloseSharp, CgChevronDoubleRightR, CgChevronDoubleDownR, CgChevronDoubleUpR, BsBoxArrowDown, IoChatbubbleEllipsesSharp, CgChevronDoubleLeftR } from '@react-icons';



function ActionMenu(props) {

    let [layoutMode] = fs.useWatch('layoutMode');

    return (
        <Menu zIndex="1001" placement='bottom-end' modifiers={[{ name: 'eventListeners', options: { scroll: false } }]}>
            <VStack display="flex" justifyContent="center" height="100%" spacing="0">
                <MenuButton
                    as={IconButton}
                    aria-label='Options'
                    w="3.5rem" h="3.5rem"
                    icon={<BsFillGearFill w="3.5rem" h="3.5rem" />}
                    variant='outline'
                />
            </VStack>
            <MenuList>

                <MenuOptionGroup
                    defaultValue={layoutMode || 'right'}
                    title='Chat Layout'
                    type='radio'
                    value={layoutMode}
                    onChange={(value) => {
                        fs.set('chatExpanded', true);
                        fs.set('scoreboardExpanded', true);

                        fs.set('layoutMode', value);
                    }}
                >
                    <MenuItemOption value='off' type="radio">Off</MenuItemOption>
                    <MenuItemOption value='right' type="radio">Right</MenuItemOption>
                    <MenuItemOption value='bottom' type="radio">Bottom</MenuItemOption>
                </MenuOptionGroup>
                <MenuDivider />

                <MenuItem icon={<IoCloseSharp w="2.5rem" h="2.5rem" />} command='⌘T'>
                    Forfeit
                </MenuItem>

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