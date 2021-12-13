import React, { Component, Fragment } from "react";
import fs from 'flatstore';

import {
    Link,
    withRouter,
    Redirect,
} from "react-router-dom";
import Logout from "./Logout";
import { Heading, VStack, Button, Center, Text, chakra } from "@chakra-ui/react";
import { FaFacebook, FaGithub, FaMicrosoft, FaGoogle } from 'react-icons/fa';
class SocialLogin extends Component {
    constructor(props) {
        super(props);
    }
    render() {

        // if (!this.props.userCheckedLogin) {
        //     return <React.Fragment></React.Fragment>
        // }
        let user = this.props.user;
        if (user) {
            return <Logout></Logout>
        }

        let refPath = fs.get('refPath');
        if (refPath) {
            refPath = '?ref=' + refPath;
        }
        else {
            refPath = '';
        }

        return (
            <VStack>

                <Heading>Login to Play</Heading>
                <VStack w={['95%', '80%', '50%', '40%']}>
                    {/* Google */}
                    <chakra.a href={"/login/google" + refPath} w="full">
                        <Button w={'full'} justifyContent="left" variant={'outline'} leftIcon={<FaGoogle size="24px" />}>

                            <Text pl="1rem">Sign in with Google</Text>

                        </Button>
                    </chakra.a>

                    {/* Microsoft */}
                    <chakra.a href={"/login/microsoft" + refPath} w="full" >
                        <Button w={'full'} justifyContent="left" variant={'outline'} leftIcon={<FaMicrosoft size="24px" />}>

                            <Text pl="1rem">Sign in with Microsoft</Text>

                        </Button>
                    </chakra.a>

                    {/* Facebook */}
                    <chakra.a href={"/login/facebook" + refPath} w="full">
                        <Button w={'full'} justifyContent="left" variant={'outline'} leftIcon={<FaFacebook size="24px" />}>

                            <Text pl="1rem">Sign in with Facebook</Text>

                        </Button>
                    </chakra.a>

                    {/* GitHub */}
                    <chakra.a href={"/login/github" + refPath} w="full">
                        <Button w={'full'} justifyContent="left" variant={'outline'} leftIcon={<FaGithub size="24px" />}>

                            <Text pl="1rem">Sign in with GitHub</Text>

                        </Button>
                    </chakra.a>
                </VStack>
            </VStack >
            // <div id="social">
            //     <h4>Login to Play!</h4>
            //     <ul>
            //         <li><a href="http://localhost:8080/login/google">with Google</a></li>
            //         <li><a href="http://localhost:8080/login/microsoft">with Microsft</a></li>
            //         <li><a href="http://localhost:8080/login/github">with GitHub as Developer</a></li>
            //     </ul>
            // </div>
        )
    }
}

export default withRouter(fs.connect(['userCheckedLogin'])(SocialLogin));