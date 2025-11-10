import {
    Box,
    Grid,
    HStack,
    IconButton,
    Text,
    VStack,
    Wrap,
} from "@chakra-ui/react";
import { updateGameField } from "../../actions/devgame";
import FSGGroup from "../../../components/widgets/inputs/FSGGroup";
import FSGNumberInput from "../../../components/widgets/inputs/FSGNumberInput";
import FSGColorPicker from "../../../components/widgets/inputs/FSGColorPicker";
import { useEffect, useRef, useState } from "react";

import schema from 'shared/model/schema.json';
import FSGTextInput from "../../../components/widgets/inputs/FSGTextInput";

import {
    FaRegArrowAltCircleUp,
    FaRegArrowAltCircleDown,
    FaArrowCircleUp,
    FaArrowCircleDown,
} from "@react-icons";

import fs from "flatstore";

function DevManageGameTeams(props) {
    const rulesGame = schema["update-game_info"];

    const onChangeByName = (name, value) => {
        // updateGameField(name, value, 'update-game_info', 'devgame', 'devgameerror');
    };

    useEffect(() => {}, []);

    const updateTeamOrdering = (a, b, c) => {
        console.log("updateTeamOrdering", a, b, c);
    };

    let prevMaxTeams = props.devgame.maxteams;

    useEffect(() => {
        let maxteams = props.devgame.maxteams;
        if (prevMaxTeams != maxteams) {
            if (maxteams < prevMaxTeams) {
                let teams = props.devgame.teams.slide(0, maxteams);
                let devgame = props.devgame;
                devgame.teams = teams;
                // fs.set('devgame', devgame);
                // fs.set('devgameteams', teams);
            } else if (maxteams > prevMaxTeams) {
                let lastTeam =
                    props.devgame.teams[props.devgame.teams.length - 1];
                let devgame = props.devgame;

                let diff = maxteams - prevMaxTeams;
                for (let i = 0; i < diff; i++) {
                    let copy = JSON.stringify(JSON.parse(lastTeam));
                    copy.team_slug = "team_" + maxteams + (i + 1);
                    devgame.teams.push(copy);
                }

                // fs.set('devgame', devgame);
                // fs.set('devgameteams', teams);
            }
        }
    });

    if (prevMaxTeams == 0) {
        return <></>;
    }
    return (
        <>
            <FSGGroup hfontSize="md" title="Team Configuration">
                <VStack w="100%">
                    <HStack w="100%" pb="3rem">
                        <FSGNumberInput
                            type="number"
                            name="minteams"
                            rules="update-game_info"
                            group={"devgame>" + "minteams"}
                            id="minteams"
                            title="Min Teams"
                            min="1"
                            max="100"
                            required={rulesGame["minteams"].required}
                            value={props.devgame.minteams || "0"}
                            onChange={(e) => {
                                let count = Number.parseInt(e);
                                if (count > props.devgame.maxteams) {
                                    onChangeByName(
                                        "minteams",
                                        props.devgame.maxteams
                                    );
                                } else if (count < 0) {
                                    onChangeByName("minteams", 0);
                                } else {
                                    onChangeByName("minteams", parseInt(e));
                                }

                                // onChangeByName('minteams', parseInt(e))
                            }}
                        />

                        <FSGNumberInput
                            type="number"
                            name="maxteams"
                            rules="update-game_info"
                            group={"devgame>" + "maxteams"}
                            id="maxteams"
                            title="Max Teams"
                            min="1"
                            max="100"
                            required={rulesGame["maxteams"].required}
                            value={props.devgame.maxteams || "0"}
                            onChange={(e) => {
                                // onChangeByName('maxteams', parseInt(e))
                                let count = Number.parseInt(e);
                                if (count < props.devgame.minteams) {
                                    onChangeByName(
                                        "maxteams",
                                        props.devgame.minteams
                                    );
                                } else if (count < 0) {
                                    onChangeByName("maxteams", 0);
                                } else {
                                    onChangeByName("maxteams", parseInt(e));
                                }
                            }}
                        />
                    </HStack>

                    {/* <DevGameTeamDefinition devgame={} /> */}
                </VStack>
            </FSGGroup>
            <FSGGroup hfontSize="md" title="Team Definitions">
                <DevGameTeamsList />;
            </FSGGroup>
        </>
    );
}

function DevGameTeamsList(props) {
    const renderTeamDefinitions = () => {
        let devgame = fs.get("devgame");
        let teams = devgame?.teams;

        let teamDefs = [];
        if (!teams) return <></>;

        let index = 0;
        let maxteams = devgame?.maxteams || 0;

        for (let i = 0; i < maxteams; i++) {
            let team = teams[i];
            teamDefs.push(
                <DevGameTeamDefinition
                    isOdd={index % 2 == 1}
                    key={"devgameteam-" + team.team_slug + team.team_order}
                    devgame={devgame}
                    {...team}
                />
            );
        }
        return teamDefs;
    };

    return <Box width="100%">{renderTeamDefinitions()}</Box>;
}
DevGameTeamsList = fs.connect(["loaded/devgameteams"])(DevGameTeamsList);

function DevGameTeamDefinition(props) {
    const rulesTeam = schema["update-game_team"];

    const teamRef = useRef();
    let [offset, setOffset] = useState(null);
    let [active, setActive] = useState(false);

    const onChangeByName = (name, value) => {
        let teams = props.devgame.teams;
        let teamid = -1;
        for (let i = 0; i < teams.length; i++) {
            if (teams[i].team_slug == props.team_slug) {
                teamid = i;
                break;
            }
        }

        if (teamid == -1) return;

        // updateGameField(name, value, 'update-game_team', 'devgameteams>' + teamid, 'devgameerror');
    };

    const inputChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        let teams = props.devgame.teams;
        let teamid = -1;
        for (let i = 0; i < teams.length; i++) {
            if (teams[i].team_slug == props.team_slug) {
                teamid = i;
                break;
            }
        }

        if (teamid == -1) return;

        // updateGameField(name, value, 'update-game_team', 'devgameteams>' + teamid, 'devgameerror');
    };

    const arraymove = (arr, fromIndex, toIndex) => {
        var element = arr[fromIndex];
        arr.splice(fromIndex, 1);
        arr.splice(toIndex, 0, element);
    };

    const getOffset = (el) => {
        const rect = el.getBoundingClientRect();
        return {
            left: rect.left + window.scrollX,
            top: rect.top + window.scrollY,
        };
    };

    const onChangeOrder = (dir) => {
        let devgame = fs.get("devgame");
        let teams = devgame.teams;

        let newIndex = props.team_order + dir;
        if (newIndex < 0) return;
        if (newIndex >= props.devgame.teams.length) return;

        arraymove(teams, props.team_order, newIndex);

        for (let i = 0; i < teams.length; i++) {
            if (teams[i].team_order != i) {
                teams[i].team_order = i;
                fs.set("devgameteams>" + i, teams[i]);
            }
        }

        // fs.set('devgame', devgame);
        // fs.set('devgameteams', teams);

        fs.set("loaded/devgameteams", Date.now());

        // setOffset(newOffset);
        setActive(true);
        setTimeout(() => {
            setActive(false);
        }, 1000);
    };

    useEffect(() => {
        setOffset(getOffset(teamRef.current));
    }, []);

    useEffect(() => {
        if (active) {
            let newOffset = getOffset(teamRef.current);
            let yDiff = newOffset.top - offset.top;

            teamRef.current.scrollIntoView();

            if (newOffset.top != offset.top) {
                setOffset(newOffset);
            }
        }
    });

    let isUpActive = props?.devgame?.teams && props.team_order > 0;
    let isDownActive =
        props?.devgame?.teams &&
        props.team_order < props.devgame.teams.length - 1;

    return (
        <Box
            ref={teamRef}
            pt="2rem"
            pb="2rem"
            transition={"background 0.3s ease"}
            bgColor={active ? "gray.600" : ""}
            _hover={{ bgColor: "gray.700" }}
            borderTop={"1px solid"}
            borderTopColor={"gray.600"}
        >
            {/* <Text as="h5" color={'white'}>{props?.team?.team_name}</Text> */}
            <Grid
                templateColumns="80% 20%"
                gap={"3rem"}
                bgColor={props.isOdd ? "gray.900" : ""}
                w="100%"
            >
                {/* <HStack    > */}
                <HStack>
                    <VStack
                        spacing="1rem"
                        justifyContent={"center"}
                        alignContent="center"
                    >
                        <IconButton
                            color={isUpActive ? "gray.300" : "gray.600"}
                            _hover={{
                                color: isUpActive ? "white" : "gray.600",
                            }}
                            _active={{
                                color: isUpActive ? "gray.100" : "gray.600",
                            }}
                            onClick={() => {
                                if (!isUpActive) return;
                                onChangeOrder(-1);
                            }}
                            cursor={isUpActive ? "pointer" : ""}
                            icon={<FaArrowCircleUp size="2rem" />}
                            width="2.8rem"
                            height="2.8rem"
                            isRound="true"
                            // onMouseOver={() => { setActive(true) }}
                            // onMouseDown={() => { setActive(true) }}
                            // onMouseLeave={() => { setActive(false) }}
                            // onMouseOut={() => { setActive(false) }}
                        />
                        <Text color="white" fontSize="xs" fontWeight={"bold"}>
                            {props.team_order}
                        </Text>
                        <IconButton
                            color={isDownActive ? "gray.300" : "gray.600"}
                            cursor={isDownActive ? "pointer" : ""}
                            onClick={() => {
                                if (!isDownActive) return;
                                onChangeOrder(1);
                            }}
                            _hover={{
                                color: isDownActive ? "white" : "gray.600",
                            }}
                            _active={{
                                color: isDownActive ? "gray.100" : "gray.600",
                            }}
                            icon={<FaArrowCircleDown size="2rem" />}
                            width="2.8rem"
                            height="2.8rem"
                            isRound="true"

                            // onMouseOver={() => { setActive(true) }}
                            // onMouseDown={() => { setActive(true) }}
                            // onMouseLeave={() => { setActive(false) }}
                            // onMouseOut={() => { setActive(false) }}
                        />
                    </VStack>
                    <Wrap pt="2rem" pb="2rem" width="100%" px="2rem">
                        <HStack w="100%">
                            <FSGTextInput
                                type="text"
                                name="team_name"
                                rules="update-game_team"
                                group={
                                    "devgameteams>" +
                                    props.team_order +
                                    ">team_name"
                                }
                                id="team_name"
                                title="Team Name"
                                maxLength="64"
                                required={rulesTeam["team_name"].required}
                                value={props.team_name || ""}
                                onChange={inputChange}
                            />

                            <FSGTextInput
                                type="text"
                                name="team_slug"
                                rules="update-game_team"
                                group={
                                    "devgameteams>" +
                                    props.team_order +
                                    ">team_slug"
                                }
                                id="team_slug"
                                title="Team Slug"
                                maxLength="32"
                                required={rulesTeam["team_slug"].required}
                                value={props.team_slug || ""}
                                onChange={inputChange}
                            />
                        </HStack>
                        <HStack w="100%">
                            <FSGNumberInput
                                type="number"
                                name="minplayers"
                                rules="update-game_team"
                                group={
                                    "devgameteams>" +
                                    props.team_order +
                                    ">minplayers"
                                }
                                id="minplayers"
                                title="Min Players"
                                min="1"
                                max="100"
                                required={rulesTeam["minplayers"].required}
                                value={props.minplayers || "1"}
                                onChange={(e) => {
                                    let count = Number.parseInt(e);
                                    if (count > props.maxplayers) {
                                        onChangeByName(
                                            "minplayers",
                                            props.maxplayers
                                        );
                                    } else if (count < 0) {
                                        onChangeByName("minplayers", 0);
                                    } else {
                                        onChangeByName(
                                            "minplayers",
                                            parseInt(e)
                                        );
                                    }
                                    // onChangeByName('minplayers', parseInt(e))
                                }}
                            />
                            <FSGNumberInput
                                type="number"
                                name="maxplayers"
                                rules="update-game_team"
                                group={
                                    "devgameteams>" +
                                    props.team_order +
                                    ">maxplayers"
                                }
                                id="maxplayers"
                                title="Max Players"
                                min="1"
                                max="100"
                                required={rulesTeam["maxplayers"].required}
                                value={props.maxplayers || "1"}
                                onChange={(e) => {
                                    let count = Number.parseInt(e);
                                    if (count < props.minplayers) {
                                        onChangeByName(
                                            "maxplayers",
                                            props.minplayers
                                        );
                                    } else if (count < 0) {
                                        onChangeByName("maxplayers", 0);
                                    } else {
                                        onChangeByName(
                                            "maxplayers",
                                            parseInt(e)
                                        );
                                    }
                                    // onChangeByName('maxplayers', parseInt(e))
                                }}
                            />
                        </HStack>
                    </Wrap>
                </HStack>
                <Box pt="3rem" pb="3rem">
                    <FSGColorPicker
                        type="color"
                        name="color"
                        rules="update-game_team"
                        group={"devgameteams>" + props.team_order + ">color"}
                        id="color"
                        height="100%"
                        width="3rem"
                        fontSize="xxs"
                        //title="Team Color"
                        required={rulesTeam["color"].required}
                        value={props.color || "#f00"}
                        onChange={(color) => {
                            //onChangeByName('color', color)
                        }}
                    />
                </Box>
                {/* </HStack> */}
            </Grid>
        </Box>
    );
}

let onCustomWatched = (ownProps) => {
    return ["devgameteams>" + ownProps.team_order];
};
let onCustomProps = (key, value, store, ownProps) => {
    if (key == "devgameteams>" + ownProps.team_order)
        return { gamepanel: value };
    return {};
};

DevGameTeamDefinition = fs.connect([])(DevGameTeamDefinition);

export default fs.connect([])(DevManageGameTeams);
