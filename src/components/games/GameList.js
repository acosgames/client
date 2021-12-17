import { Component } from "react";

import {
    Link,
    withRouter,
} from "react-router-dom";
import { Redirect } from 'react-router';

import { findGames } from '../../actions/game';
import fs from 'flatstore';
import GameListItem from "./GameListItem";
import { Flex, Heading, VStack, Wrap } from "@chakra-ui/react";

class GameList extends Component {
    constructor(props) {
        super(props);

        this.state = {
        }

        findGames();
    }

    render() {
        let games = this.props.games || [];

        let productionGames = games.filter(v => v.status == 3);
        let betaGames = games.filter(v => v.status == 2);
        return (
            <VStack width="100%" align="left" spacing="4rem">
                <VStack align="left">
                    <Heading as="h1" size="lg">Games</Heading>
                    <Wrap w="100%" spacing="1rem">
                        {
                            productionGames.map(game => (<GameListItem key={"gamelistitem-" + game.game_slug} game={game}></GameListItem>))
                        }
                    </Wrap>
                </VStack>
                <VStack align="left">
                    <Heading as="h1" size="lg">Needs Testing</Heading>
                    <Flex w="100%">
                        {
                            betaGames.map(game => (<GameListItem key={"gamelistitem-" + game.game_slug} game={game}></GameListItem>))
                        }
                    </Flex>
                </VStack>
            </VStack>
            // <div id="game-grid-wrapper">
            //     <h3>Games</h3>
            //     <div id="game-grid">
            //         {
            //             productionGames.map(game => (<GameListItem key={"gamelistitem-" + game.gameid} game={game}></GameListItem>))
            //         }
            //     </div>
            //     <h3>Games in Beta</h3>
            //     <div id="game-grid">
            //         {
            //             betaGames.map(game => (<GameListItem key={"gamelistitem-" + game.gameid} game={game}></GameListItem>))
            //         }
            //     </div>
            // </div>
        )
    }
}

export default withRouter(fs.connect(['games'])(GameList));