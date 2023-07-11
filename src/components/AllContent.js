import { Box } from '@chakra-ui/react';
import fs from 'flatstore';
import { Route, Routes } from 'react-router-dom';
import { getGamePanel, getGamePanels, getPrimaryGamePanel } from '../actions/room';
import ACOSRoutes from '../routes/ACOSRoutes';
import RoutesGame from '../routes/RoutesGame';
import AcosFooter from './AcosFooter';

import GameInfo2 from '../components/games/GameInfo/GameInfoDesktop'
import GameReplayDesktop from './games/GameReplay/GameReplayDesktop';

function AllContent(props) {

    let [displayMode] = fs.useWatch('displayMode');
    let [primaryGamePanel] = fs.useWatch('primaryGamePanel');

    let gamepanelID = props.primaryGamePanel;
    let gamepanel = getGamePanel(gamepanelID);
    //display modes for primary gamepanel: none, standard, theatre, fullscreen
    // if displayMode == none, its because all gamepanels are embedded or floating
    // let displayMode = fs.get('displayMode') || 'none'

    if (gamepanel) {
        displayMode = 'standard';
    }
    let shouldDarkenBackground = getPrimaryGamePanel();



    return (
        <Box
            position='relative'
            flexGrow='1 '
            height='100% '
            width='100%'
            maxWidth="1200px"
            display='flex'


            flexDirection='column'

            // transition={'filter 1s ease-in'}
            // filter={shouldDarkenBackground ? 'blur(20px)' : 'blur(0)'}
            maxW={['1200px']}

        >
            <Routes>
                <Route path="/g/:game_slug" element={<GameInfo2 />}></Route>
                <Route path="/g/:game_slug/replays/:mode/:version/:filename" element={<GameInfo2 />}></Route>
                <Route path="/g/:game_slug/ingame/:roomId" element={<GameInfo2 />}></Route>
                <Route path="*" element={<ACOSRoutes />}></Route>
            </Routes>
            <AcosFooter />
        </Box>
    )
}


export default AllContent;