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
        <FSGGroup title="Build Information" spacing="1rem" hfontSize="sm">
            <Grid width="100%" spacing={'2rem'} gridTemplateColumns={'repeat(4, minmax(0, 1fr))'} rowGap={'1rem'} fontWeight='100'>
                <FSGRead disabled={true}
                    hfontSize="xs"
                    fontSize="xs"
                    title="Released"
                    color={'color.100'}
                    value={parseDate(game.tsinsert)}
                />
                <FSGRead disabled={true}
                    hfontSize="xs"
                    fontSize="xs"
                    title="Updated"
                    color={'color.100'}
                    value={parseDate(game.tsupdate)}
                />
                <FSGRead disabled={true}
                    hfontSize="xs"
                    fontSize="xs"
                    title="Published"
                    color={'color.100'}
                    value={'v' + game.version}
                />
                <FSGRead disabled={true}
                    hfontSize="xs"
                    fontSize="xs"
                    title="Experimental"
                    color={'color.100'}
                    value={'v' + game.latest_version}
                />
                <FSGRead disabled={true}
                    hfontSize="xs"
                    fontSize="xs"
                    title="Screen"
                    color={'color.100'}
                    value={screentype}
                />
                <Box display={game.screentype == 1 ? 'none' : 'block'}>


                    <FSGRead disabled={true}
                        hfontSize="xs"
                        fontSize="xs"
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