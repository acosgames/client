import { Component, Fragment, useEffect, useState } from "react";

import { Navigate, Route } from "react-router-dom";
import {
  Button,
  Text,
  Heading,
  VStack,
  Center,
  Link,
  useToast,
  IconButton,
  HStack,
  Icon,
  Box,
} from "@chakra-ui/react";

import { FaGithub } from "react-icons/fa";

import {
  FiCheckSquare,
  FiDownload,
  FiRefreshCw,
  FiSquare,
} from "react-icons/fi";

import { sendGithubInvite } from "../../actions/devgame";
// import SLink from "../widgets/SLink";
import { logout } from "../../actions/person";
import { btLoadingUser, btLoggedIn, btUser } from "../../actions/buckets";
import { useBucket } from "../../actions/bucket";

function DevLogin({}) {
  //user', 'loadingUser'
  let user = useBucket(btUser);
  let loadingUser = useBucket(btLoadingUser);

  const [sentInvite, setSentInvite] = useState(false);
  const [acceptInvite, setAcceptInvite] = useState(false);
  const toast = useToast();

  useEffect(() => {
    gtag("event", "devlogin");
  }, []);
  const onInvite = async () => {
    let success = await sendGithubInvite();
    if (success) {
      toast({
        title: "Invite sent successfully",
        status: "success",
        duration: 4000,
      });
      setSentInvite(true);
    } else {
      toast({
        title: "Invite failed.",
        status: "error",
        duration: 4000,
      });
      setSentInvite(false);
    }
  };

  if (user && user.isdev && user.github) {
    return <Navigate to="/dev" />;
  }
  if (
    user &&
    user.apikey &&
    user.apikey.length > 0 &&
    user.apikey != "undefined"
  ) {
    return <></>;
  }

  if (loadingUser) {
    return <></>;
  }

  const loggedIn = btLoggedIn.get();
  const isLoggedIn = loggedIn != "LURKER";
  const showInvite = (user && !user.isdev) || !sentInvite;
  const showLogin = !user || !user?.github;

  let step1 = loggedIn && user?.github;
  let step2 = step1 && sentInvite;
  let step3 = step2 && acceptInvite;
  let step4 = step3;

  return (
    <Center
      mb="2rem"
      w="100%"
      pt="4rem"
      px="3rem"
      bgColor="gray.925"
      // pt="0rem"
      boxShadow={"0px 3px 7px 0px rgba(0, 0, 0, 0.21)"}
      pb="10rem"
    >
      <VStack
        gap="1rem"
        align="center"
        w={["100%", "100%", "100%", "100%", "900px"]}
      >
        <Heading variant={"h1"}>Join our Developer Community</Heading>

        <Text as="p" pb={8} w="100%" color="gray.10">
          Follow the steps below to join our GitHub Organization at{" "}
          <Link
            fontWeight="400"
            color="brand.50"
            isExternal
            href="https://github.com/acosgames"
          >
            github.com/acosgames
          </Link>{" "}
          and gain access to publish games on the platform.
          <br />
          <br />
          Read our documentation to learn how to create and publish games using
          template examples.
          <br />
          <Link
            color="brand.50"
            isExternal
            href="https://sdk.acos.games"
            target="_blank"
          >
            https://sdk.acos.games
          </Link>
          <br />
          <br />
          By signing up, you agree to our{" "}
          <Link href="/privacy" color="brand.50">
            Privacy Policy
          </Link>
        </Text>

        <VStack w={["30rem", "40rem"]} pt="1rem" spacing={"1rem"}>
          <DevStep completed={step1} number={1} title={"Login to GitHub"} />

          <Button
            // h="5rem"
            onClick={(e) => {
              localStorage.setItem("refPath", "/dev");
              window.location.href = "/login/github?ref=/dev/login";
            }}
            disabled={!step1}
            p="2rem"
            w={"100%"}
            justifyContent="left"
            color="gray.0"
            bgColor={step1 ? "gray.800" : "gray.900"}
            _hover={{ bg: step1 ? "gray.850" : "gray.950" }}
            _active={{ bg: step1 ? "gray.900" : "gray.1000" }}
            leftIcon={<FaGithub size="24px" />}
          >
            <Text
              as="span"
              fontWeight="500"
              fontSize="1.4rem"
              ml="1rem"
              color="gray.0"
            >
              Sign in with github
            </Text>
          </Button>
        </VStack>

        <VStack
          filter={step1 ? "" : "blur(2px)"}
          align="center"
          w="100%"
          position="relative"
        >
          <Box
            position="absolute"
            w="100%"
            h="100%"
            display={loggedIn != "LURKER" ? "none" : "block"}
          >
            &nbsp;
          </Box>

          <VStack w={["30rem", "40rem"]} pt="1rem" spacing={"1rem"}>
            <DevStep
              completed={step2}
              number={2}
              title={"Request invite to organization"}
            />
            <Button
              // h="5rem"
              onClick={onInvite}
              p="2rem"
              w={"100%"}
              justifyContent="left"
              color="gray.0"
              bgColor={step2 ? "gray.800" : "gray.900"}
              _hover={{ bg: step2 ? "gray.850" : "gray.950" }}
              _active={{ bg: step2 ? "gray.900" : "gray.1000" }}
              leftIcon={<FiDownload />}
            >
              <Text
                as="span"
                fontWeight="500"
                fontSize="1.4rem"
                ml="1rem"
                color="gray.0"
              >
                Join{" "}
                <Text as="span" fontWeight="600" color="brand.50">
                  acosgames
                </Text>{" "}
                organization
              </Text>
            </Button>
          </VStack>

          <VStack w={["30rem", "40rem"]} pt="2rem" spacing={"1rem"}>
            <DevStep
              completed={step3}
              number={3}
              title={"Accept invite to organization"}
            />
            <a
              target="_blank"
              href="https://github.com/orgs/acosgames/invitation"
              style={{ width: "100%", display: "block" }}
            >
              <Button
                onClick={() => {
                  setAcceptInvite(true);
                }}
                //disabled={acceptInvite}
                p="2rem"
                w={"full"}
                justifyContent="left"
                color="gray.0"
                bgColor={step3 ? "gray.800" : "gray.900"}
                _hover={{ bg: step3 ? "gray.850" : "gray.950" }}
                _active={{ bg: step3 ? "gray.900" : "gray.1000" }}
                leftIcon={<FiDownload />}
              >
                <Text
                  as="span"
                  fontWeight="500"
                  fontSize="1.4rem"
                  ml="1rem"
                  color="gray.0"
                >
                  Accept{" "}
                  <Text as="span" fontWeight="600" color="brand.50">
                    acosgames
                  </Text>{" "}
                  invite
                </Text>
              </Button>
            </a>
          </VStack>

          <VStack w={["30rem", "40rem"]} pt="2rem" spacing={"1rem"}>
            <DevStep
              completed={step3}
              number={4}
              title={"Re-login to get access"}
            />
            {/* <Link
              href="/login/github?ref=/dev"
              style={{ width: "100%", display: "block" }}
            > */}
            <Button
              onClick={async () => {
                await logout();
                setAcceptInvite(true);
                localStorage.setItem("refPath", "/dev");
                window.location.href = "/login/github?ref=/dev";
              }}
              p="2rem"
              w={"100%"}
              justifyContent="left"
              color="gray.0"
              bgColor={step3 ? "gray.800" : "gray.900"}
              _hover={{ bg: step3 ? "gray.850" : "gray.950" }}
              _active={{ bg: step3 ? "gray.900" : "gray.1000" }}
              leftIcon={<FiRefreshCw />}
            >
              <Text
                as="span"
                fontWeight="500"
                fontSize="1.4rem"
                ml="1rem"
                color="gray.0"
              >
                Re-authenticate to access
              </Text>
            </Button>
            {/* </Link> */}
          </VStack>
        </VStack>
      </VStack>
    </Center>
  );
}

function DevStep({ completed, number, title }) {
  return (
    <HStack w="100%">
      <Icon
        color={completed ? "brand.500" : "brand.900"}
        fontSize="xl"
        as={completed ? FiCheckSquare : FiSquare}
      />
      <Heading as="h3" fontWeight="600" fontSize="1.6rem" color="gray.70">
        Step {number}:
      </Heading>
      <Heading
        ml="1rem"
        as="h3"
        fontWeight="500"
        fontSize="1.6rem"
        color="gray.10"
      >
        {title}
      </Heading>
    </HStack>
  );
}

// export default (fs.connect(['user', 'loadingUser'])(DevLogin));
export default DevLogin;
