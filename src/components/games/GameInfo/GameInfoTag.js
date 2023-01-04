import { Box, Text, Link } from "@chakra-ui/react";
import fs from 'flatstore';
import { useState } from "react";

/*
.tag {
  background: #eee;
  border-radius: 3px 0 0 3px;
  color: #999;
  display: inline-block;
  height: 26px;
  line-height: 26px;
  padding: 0 20px 0 23px;
  position: relative;
  margin: 0 10px 10px 0;
  text-decoration: none;
  -webkit-transition: color 0.2s;
}

.tag::before {
  background: #fff;
  border-radius: 10px;
  box-shadow: inset 0 1px rgba(0, 0, 0, 0.25);
  content: '';
  height: 6px;
  left: 10px;
  position: absolute;
  width: 6px;
  top: 10px;
}

.tag::after {
  background: #fff;
  border-bottom: 13px solid transparent;
  border-left: 10px solid #eee;
  border-top: 13px solid transparent;
  content: '';
  position: absolute;
  right: 0;
  top: 0;
}

.tag:hover {
  background-color: crimson;
  color: white;
}

.tag:hover::after {
   border-left-color: crimson; 
}
*/

function GameInfoTag(props) {


    if (props.to) {
        return (
            <Box>
                <Link href={props.to} target="_blank">
                    <Text
                        display='inline-block'
                        // borderRadius='3px'
                        padding='.3rem .8rem .3rem'
                        paddingLeft="0.8rem"
                        borderRadius='4px'
                        background='gray.800'
                        borderLeft="1rem solid"
                        borderLeftColor="gray.600"
                        color='gray.100'
                        fontWeight='900'
                        margin='.25em .1em'
                        fontSize={["1rem", "1rem", "1.2rem"]}
                        position="relative"
                        _hover={{
                            borderLeftColor: 'yellow.100'
                        }}
                    ><Text as="span" color="gray.125" pr="0.2rem" position="relative" top="0.05rem">#</Text>
                        {props.title}
                    </Text>
                </Link>
            </Box>
        )
    }

    return (
        <Box>
            <Text
                display='inline-block'
                // borderRadius='3px'
                padding='.3rem .8rem .3rem'
                paddingLeft="0.8rem"
                borderRadius='4px'
                background='gray.800'
                // borderLeft="1rem solid"
                // borderLeftColor="transparent"
                color='gray.100'
                fontWeight='900'
                margin='.25em .1em'
                fontSize={["1rem", "1rem", "1.2rem"]}
                position="relative"

            ><Text as="span" color="gray.125" pr="0.2rem" position="relative" top="0.05rem">#</Text>
                {props.title}
            </Text>
        </Box>
    )

    return (
        <Box>
            <Text
                background="gray.600"
                borderRadius='3px 0 0 3px'
                color='gray.100'
                display='inline-block'
                height='2.6rem'
                fontSize="2xs"
                lineHeight='26px'
                padding='0 20px 0 23px'
                position='relative'
                margin='0 10px 10px 0'
                textDecoration='none'
                //transition='color 0.2s, background-color 0.2s'
                _before={{
                    background: 'gray.100',
                    borderRadius: '10px',
                    boxShadow: 'inset 0 1px rgba(0, 0, 0, 0.25)',
                    content: "''",
                    height: '6px',
                    left: '10px',
                    position: 'absolute',
                    width: '6px',
                    top: '10px',

                }}
                _after={{
                    background: 'gray.1000',
                    borderBottom: '13px solid transparent',
                    borderLeft: '10px solid #eee',
                    borderLeftColor: 'gray.600',
                    borderTop: '13px solid transparent',
                    content: "''",
                    position: 'absolute',
                    right: '0',
                    top: '0',
                    //transition: 'color 0.2s, background-color 0.2s'
                }}
                _hover={{
                    _after: {
                        borderLeftColor: 'gray.800',
                        //transition: 'color 0.2s, background-color 0.2s'
                    },
                    backgroundColor: 'gray.800',
                    // color: 'gray.1000',
                }}

            >{props.title}</Text>
        </Box>
    )

}

export default GameInfoTag;