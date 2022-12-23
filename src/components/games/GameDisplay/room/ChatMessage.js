import fs from 'flatstore';
import { Box, Text, Image } from "@chakra-ui/react";
import { Link, useLocation } from 'react-router-dom';
import ColorHash from 'color-hash';
const colorHash = new ColorHash({ lightness: 0.7 });
import config from '../../../../config';

function ChatMessage(props) {

    let msg = props?.msg;
    //show game icon if user is in game page
    let showThumb = false;
    if (msg.game_slug && msg.icon) {
        showThumb = true;
    }


    let displayname = msg.displayname;
    if (displayname.length > 16) {
        displayname = msg.displayname.substr(0, 16) + '...';
    }

    return (
        <Box
            //bgColor="gray.1200"
            //borderRadius="2rem"
            //p={["0.2rem", "0.2rem", "0.5rem"]}
            my="0.0rem"

            width="100%"
            overflow="hidden"
            lineHeight="1.5rem"
            position="relative"
        >
            {showThumb &&
                (
                    <Link w="100%" h="100%" to={`/g/${msg.game_slug}`}>
                        <Image
                            alt={'A cup of skill logo'}
                            src={`${config.https.cdn}g/${msg.game_slug}/preview/${msg.icon}`}
                            h="2rem"
                            w="2rem"
                            mr="0.5rem"
                            display="inline-block"
                            verticalAlign={'middle'}
                        />
                    </Link>
                )
            }
            <Link to={`/profile/${msg.displayname}`}>
                <Text fontWeight={'900'} fontSize="xxs" as="span" color={colorHash.hex(msg.displayname)}>{displayname}</Text>
            </Link>
            <Text fontWeight={'light'} fontSize="xxs" as="span">: </Text>
            <Text
                fontWeight={'300'}
                fontSize="xxs"
                as="span"
                textShadow="0px 1px 2px rgb(0 0 0 / 75%)"
            >
                {msg.message}
            </Text>
        </Box >
    )
}

export default ChatMessage;