import { Text, VStack } from "@chakra-ui/react";

function MessageGameOverMulti(props) {
  let rankers = props.players;
  if (props.teams) {
    rankers = props.teams;
  }
  let rankerIds = Object.keys(rankers);

  let bestRankCount = 0;
  let bestName = "";

  let bestRank = 100000;
  let bestTeamColor = "white";

  for (let i = 0; i < rankerIds.length; i++) {
    let playerid = rankerIds[i];
    let p = rankers[playerid];
    if (p.rank < bestRank) {
      bestRank = p.rank;
      bestName = p.name || p.displayname;
      bestTeamColor = p?.color || "white";
    }
  }

  for (let i = 0; i < rankerIds.length; i++) {
    let playerid = rankerIds[i];
    let p = rankers[playerid];
    if (p.rank == bestRank) {
      bestRankCount++;
    }
  }

  let player = props.players[props.local] || {};
  let rank = player.rank;
  if (props.teams && player.teamid) {
    rank = props.teams[player.teamid]?.rank || 999;
  }

  if (!Number.isInteger(rank)) rank = 999;

  // if (rank == bestRank) {
  if (bestRankCount == rankerIds.length) {
    return (
      <Text
        key="header-you-win"
        as="h3"
        fontSize={props.isPrimary ? "4rem" : "xxs"}
        fontWeight="bold"
      >
        Tie Game
      </Text>
    );
  }
  return (
    <VStack key="header-winner" color={"white"}>
      <Text
        as="h3"
        fontSize={props.isPrimary ? "4rem" : "xxs"}
        fontWeight="bold"
      >
        WINNER
      </Text>
      <Text
        as="h4"
        fontSize={props.isPrimary ? "3rem" : "xxs"}
        fontWeight="bold"
        //color={'white'}
        //filter={'drop-shadow(0px 0px 10px ' + bestTeamColor + ')' + ' drop-shadow(0px 0px 6px ' + bestTeamColor + ')' + ' drop-shadow(0px 0px 4px ' + bestTeamColor + ')'}
      >
        {bestName}
      </Text>
    </VStack>
  );
}

export default MessageGameOverMulti;
