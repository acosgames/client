
import {
    Link,
    withRouter,
} from "react-router-dom";

import fs from 'flatstore';
import { useEffect } from "react";
import { VStack, Image, Text, HStack, Icon } from "@chakra-ui/react";

import { IoPeople } from "@react-icons/all-files/io5/IoPeople";

// import { IoPeople } from "@react-icons";

function GameListItem(props) {

    const game = props.game;

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
        fs.set('game', game);
        props.history.push("/g/" + game.game_slug);
    }

    var imgUrl = 'https://cdn.fivesecondgames.com/file/fivesecondgames/placeholder.png';
    if (game.preview_images && game.preview_images.length > 0)
        imgUrl = `https://cdn.fivesecondgames.com/file/fivesecondgames/${game.gameid}/preview/${game.preview_images}`;

    let gameName = game.name;
    if (gameName.length > 20) {
        gameName = gameName.substr(0, 20) + '...';
    }

    return (
        <VStack cursor="pointer" key={game.game_slug} onClick={handleClick}>
            <Image
                w={['140px', '140px', '140px', '140px']}
                h={['140px', '140px', '140px', '140px']}
                alt={gameName}
                src={imgUrl} borderRadius={'50%'} />
            <Text>{gameName}</Text>
            <HStack>
                <Icon as={IoPeople} />
                <Text>{abbrevNumber(game.activePlayers * game.maxplayers)}</Text>
            </HStack>
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