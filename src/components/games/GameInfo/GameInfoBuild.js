import { Box, Grid } from '@chakra-ui/react';
import fs from 'flatstore'
import FSGGroup from '../../widgets/inputs/FSGGroup';
import FSGRead from '../../widgets/inputs/FSGRead';


function GameInfoBuild(props) {

    const [game] = fs.useWatch('game');


    const parseDate = (dt) => {
        if (!dt)
            return '';
        return dt.split('T')[0];
    }

    let screentype = game.screentype;
    switch (screentype) {
        case 1: screentype = 'Fullscreen'; break;
        case 2: screentype = 'Fixed Resolution'; break;
        case 3: screentype = 'Scaled Resolution'; break;
    }

    let resow = game.resow;
    let resoh = game.resoh;
    let screenwidth = game.screenwidth;
    let resolution = resow + ':' + resoh;
    if (game.screentype == 3) {
        resolution += ' @ ' + screenwidth + 'px';
    }

    return (
        <FSGGroup title="Build Information" pl="0" pr="0" spacing="1rem" hfontSize="sm">
            <Grid
                width="100%"
                spacing={'2rem'}
                p="1rem"
                gridTemplateColumns={'repeat(3, minmax(0, 1fr))'}
                rowGap={'1rem'}

            >
                <FSGRead disabled={true}
                    hfontSize="xs"
                    fontSize="xs"
                    title="Released"
                    color={'color.100'}
                    fontWeight='700'
                    value={parseDate(game.tsinsert)}
                />
                <FSGRead disabled={true}
                    hfontSize="xs"
                    fontSize="xs"
                    title="Updated"
                    fontWeight='700'
                    color={'color.100'}
                    value={parseDate(game.tsupdate)}
                />
                <FSGRead disabled={true}
                    hfontSize="xs"
                    fontSize="xs"
                    title="Published"
                    fontWeight='700'
                    color={'color.100'}
                    value={'v' + game.version}
                />
                <FSGRead disabled={true}
                    hfontSize="xs"
                    fontSize="xs"
                    fontWeight='700'
                    title="Experimental"
                    color={'color.100'}
                    value={'v' + game.latest_version}
                />
                <FSGRead disabled={true}
                    hfontSize="xs"
                    fontSize="xs"
                    fontWeight='700'
                    title="Screen"
                    color={'color.100'}
                    value={screentype}
                />
                <Box display={game.screentype == 1 ? 'none' : 'block'}>


                    <FSGRead disabled={true}
                        hfontSize="xs"
                        fontSize="xs"
                        fontWeight='700'
                        title="Resolution"
                        color={'color.100'}
                        value={resolution}
                    />
                </Box>
            </Grid>

        </FSGGroup>
    )
}

export default GameInfoBuild;