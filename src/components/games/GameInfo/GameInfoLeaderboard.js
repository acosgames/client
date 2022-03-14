import GameInfoTop10 from './GameInfoTop10'
import GameInfoTop10Highscores from './GameInfoTop10Highscores'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

function GameInfoLeaderboard(props) {

    if (props.gameinfo.maxplayers == 1) {
        return <GameInfoTop10Highscores />
    }
    if (!props.gameinfo.lbscore)
        return (<GameInfoTop10 />)

    return (
        <Tabs w="100%" variant='enclosed'>
            <TabList>
                <Tab>Rankings</Tab>
                <Tab>Highscores</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <GameInfoTop10 />
                </TabPanel>
                <TabPanel>
                    <GameInfoTop10Highscores />
                </TabPanel>
            </TabPanels>

        </Tabs>
    )
}


export default GameInfoLeaderboard;