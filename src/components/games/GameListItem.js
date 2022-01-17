
import {
    Link,
    withRouter,
} from "react-router-dom";

import config from '../../config'

import fs from 'flatstore';
import { useEffect } from "react";
import { VStack, Image, Text, HStack, Icon, Button } from "@chakra-ui/react";

import { FaPlay } from '@react-icons';
import { getUser } from "../../actions/person";
import { joinGame } from "../../actions/game";

function GameListItem(props) {

    const game = props.game;

    const handleJoin = async () => {

        fs.set('lastJoin', 'rank');

        let user = await getUser();
        if (!user || !user.shortid) {
            fs.set('justCreatedName', false);
            fs.set('isCreateDisplayName', true);
            return;
        }

        //let game_slug = props.match.params.game_slug;

        joinGame(game);
    }


    const abbrevNumber = (num) => {
        if (num > 999999) {
            return (num / 1000000.0).toFixed(1) + "M";
        }
        if (num > 999) {
            return (num / 1000.0).toFixed(1) + "k";
        }
        return num;
    }

    const handleClick = () => {
        // fs.set('game', game);
        props.history.push("/g/" + game.game_slug);
    }

    var imgUrl = config.https.cdn + 'placeholder.png';
    if (game.preview_images && game.preview_images.length > 0)
        imgUrl = `${config.https.cdn}g/${game.game_slug}/preview/${game.preview_images}`;

    let gameName = game.name;
    if (gameName.length > 20) {
        gameName = gameName.substr(0, 20) + '...';
    }

    return (

        <VStack cursor="pointer" spacing="0" key={game.game_slug} >
            <Link to={'/g/' + game.game_slug}>
                <Image
                    w={['140px', '140px', '140px', '140px']}
                    minW={['140px', '140px', '140px', '140px']}
                    h={['140px', '140px', '140px', '140px']}
                    minH={['140px', '140px', '140px', '140px']}
                    alt={gameName}
                    src={imgUrl}
                    fallbackSrc={config.https.cdn + 'placeholder.png'}
                />
            </Link>
            <Link to={'/g/' + game.game_slug}>
                <Text
                    as="h6" size="sm" fontWeight={'bold'}
                    bgColor={'gray.900'}
                    w="100%"
                    h="100%"
                    p="0"
                    m="0"
                    textAlign={'center'}
                >{gameName}</Text>
            </Link>
            <Button
                flex="1"
                bgColor="brand.500"
                _hover={{ bg: "brand.600" }}
                _active={{ bg: "brand.900" }}
                size="md"
                mr="0"
                w="30%"
                p="0.5rem"
                // icon={<FaPlay />}
                borderTopLeftRadius={"9999px"}
                borderBottomLeftRadius={"9999px"}

                borderTopRightRadius={'9999px'}
                borderBottomRightRadius={'9999px'}
                onClick={handleJoin}
            >
                <Icon ml={0} fontSize="12px" as={FaPlay} />
            </Button>
            {/* <HStack>
                <Icon as={IoPeople} />
                <Text>{abbrevNumber(game.activePlayers * game.maxplayers)}</Text>
            </HStack> */}
        </VStack>
        // <div className="game-item" >

        //     <div className="game-title"><span></span></div>
        //     <div className="game-attributes">
        //         <ul>
        //             <li>
        //                 <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 0 24 24" width="24px" fill="#ccc"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M9 13.75c-2.34 0-7 1.17-7 3.5V19h14v-1.75c0-2.33-4.66-3.5-7-3.5zM4.34 17c.84-.58 2.87-1.25 4.66-1.25s3.82.67 4.66 1.25H4.34zM9 12c1.93 0 3.5-1.57 3.5-3.5S10.93 5 9 5 5.5 6.57 5.5 8.5 7.07 12 9 12zm0-5c.83 0 1.5.67 1.5 1.5S9.83 10 9 10s-1.5-.67-1.5-1.5S8.17 7 9 7zm7.04 6.81c1.16.84 1.96 1.96 1.96 3.44V19h4v-1.75c0-2.02-3.5-3.17-5.96-3.44zM15 12c1.93 0 3.5-1.57 3.5-3.5S16.93 5 15 5c-.54 0-1.04.13-1.5.35.63.89 1 1.98 1 3.15s-.37 2.26-1 3.15c.46.22.96.35 1.5.35z" /></svg>
        //                 <span>{abbrevNumber(game.activePlayers * game.maxplayers)}</span>
        //             </li>
        //         </ul>
        //     </div>
        // </div>
    )
}

export default withRouter(GameListItem);