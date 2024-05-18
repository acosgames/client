import {
  Text,
  Box,
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  VStack,
  Link as ChLink,
  HStack,
  Wrap,
  Divider,
  Image,
  Icon,
  IconButton,
  Spinner,
} from "@chakra-ui/react";

import { useEffect, useRef, useState } from "react";
import {
  createDisplayName,
  createTempUser,
  loginComplete,
} from "../../../actions/person";
import FSGSubmit from "../../../components/widgets/inputs/FSGSubmit"; //" widgets/inputs/FSGSubmit";
import FSGTextInput from "../../../components/widgets/inputs/FSGTextInput";

import { FaRandom } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

import { Link, useLocation } from "react-router-dom";
import { wsJoinQueues } from "../../../actions/connection";
import { getJoinQueues } from "../../../actions/queue";
import config from "../../../config";

import {
  FacebookLoginButton,
  GoogleLoginButton,
  GithubLoginButton,
  MicrosoftLoginButton,
  YahooLoginButton,
} from "react-social-login-buttons";
import ChooseCountry from "./ChooseCountry";
import { removeWithExpiry } from "../../../actions/cache";
import adjectives from "../../../actions/dictionaries/adjectives";
import nouns from "../../../actions/dictionaries/nouns";
import { useBucket } from "../../../actions/bucket";
import {
  btCountryChanged,
  btDisplayName,
  btGame,
  btIsChoosePortrait,
  btIsCreateDisplayName,
  btLoginFrom,
  btPortraitId,
  btRefPath,
  btUser,
} from "../../../actions/buckets";

// let defaultPlayerName = localStorage.getItem('displayname') || ("Player" + Math.round(Math.random() * 10000));

let hasGeneratedName = false;

export default function GameInfoCreateDisplayname({ onClose, isOpen, onOpen }) {
  let user = useBucket(btUser);

  let isCreateDisplayName = useBucket(btIsCreateDisplayName);
  let portraitid = useBucket(btPortraitId);

  // const onClose = onClose;
  // const isOpen = isOpen;
  // const onOpen = onOpen;

  const generateName = () => {
    let generatedAdjective =
      adjectives[Math.floor(Math.random() * adjectives.length)];
    let generatedNoun = nouns[Math.floor(Math.random() * nouns.length)];
    let generatedName =
      generatedAdjective.replaceAll("-", " ") +
      " " +
      generatedNoun.replaceAll("-", " ");
    let nameParts = generatedName.split(" ");
    nameParts = nameParts.map(
      (name) => name[0].toUpperCase() + name.substring(1)
    );

    btDisplayName.set(nameParts.join(""));
  };

  const generatePortrait = () => {
    let newportraitid = Math.floor(Math.random() * (2104 - 1 + 1) + 1);
    btPortraitId.set(newportraitid);
  };
  let displayname = useBucket(btDisplayName);
  if (!displayname && !hasGeneratedName) {
    generateName();
    hasGeneratedName = false;
    // displayname = defaultPlayerName;
  }
  // const [displayname, setDisplayName] = useState(defaultPlayerName);
  const [error, setError] = useState(null);

  // const navigate = useNavigate();

  let joinqueues = getJoinQueues();

  let queues = joinqueues.queues || [];
  let isJoiningQueues = queues.length > 0;

  useEffect(() => {
    if (user && !user.displayname && !isCreateDisplayName)
      btIsCreateDisplayName.set(true);
  });

  useEffect(() => {
    generatePortrait();
  }, []);

  const onSubmit = async () => {
    if (!displayname || displayname.length < 3) {
      setError({ message: `The name '${displayname}' is too short.` });
      return;
    }

    let countryChanged = btCountryChanged.get() || {
      label: "United States of America (USA)",
      value: "US",
    };
    let countrycode = countryChanged.value;

    let user = null;
    let existingUser = btUser.get();
    if (existingUser && existingUser.email && !existingUser.displayname) {
      user = await createDisplayName({ displayname, portraitid, countrycode });
    } else if (!existingUser) {
      user = await createTempUser({ displayname, portraitid, countrycode });
    } else {
      setError({ message: `Invalid Account Creation.` });
      return;
    }

    // let user = await createTempUser(displayname);

    if (!user) {
      setError({ message: `Server not working. Please try again.` });
      return;
    }

    if (user.ecode) {
      switch (user.ecode) {
        case "E_PERSON_EXISTSNAME":
          setError({ message: `You already have a display name.` });

          break;
        case "E_EXISTS_DISPLAYNAME":
          setError({ message: `The name '${displayname}' already exists.` });
          break;
        case "E_PERSON_DUPENAME":
          setError({ message: `The name '${displayname}' already exists.` });
          break;
        case "E_MISSING_DISPLAYNAME":
          setError({ message: `Please enter a display name.` });
          break;
        case "E_DISPLAYNAME_TOOSHORT":
          setError({ message: `The name '${displayname}' is too short.` });
          break;
        default:
          setError({
            message: `[${user.ecode}] Server not working. Please try again.`,
          });
          break;
      }
    } else {
      // setTimeout(redirect, 1000);

      loginComplete();
    }
  };

  const onChange = (e) => {
    console.log(e.target.value);
    let displayname = e.target.value;
    displayname = displayname.replace(/[^A-Za-z0-9\_]/gi, "");
    // setDisplayName(name);
    btDisplayName.set(displayname);
    localStorage.setItem("displayname", displayname);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  let hasError = error;

  let loginFrom = btLoginFrom.get();

  let joinButtonTitle = "Play now!";
  let game = btGame.get();
  if (loginFrom == "game") {
    if (game?.maxplayers == 1) {
      joinButtonTitle = "Join Game";
    } else {
      joinButtonTitle = "Join Queue";
    }
  }
  joinButtonTitle = "Play";

  let filename = "assorted-" + portraitid + "-original.webp";

  return (
    <Box>
      <Modal
        borderRadius="8px"
        size={"2xl"}
        isOpen={isOpen || isCreateDisplayName}
        onClose={(e) => {
          btIsCreateDisplayName.set(false);
          onClose(e);
        }}
      >
        <ModalOverlay />
        <ModalContent
          bg="linear-gradient(to right, var(--chakra-colors-gray-600), var(--chakra-colors-gray-800))"
          borderRadius="8px"
          bgColor="gray.800"
        >
          <ModalHeader
            color="gray.10"
            fontWeight={"600"}
            textAlign={"center"}
            fontSize="1.6rem"
            pb="0"
            py="1rem"
          >
            {user && !user.email ? "Save your profile" : "Create Account"}
          </ModalHeader>
          <ModalCloseButton top="1rem" right="1rem" />
          <ModalBody>
            <VStack spacing="1rem" w="100%">
              {/* <FSGGroup bgColor="gray.1100"> */}

              <VStack
                display={user && !user.email ? "none" : "flex"}
                spacing="0"
                w="100%"
                pb="1rem"
              >
                <HStack w="100%" alignItems={"flex-start"} spacing="1rem">
                  <VStack spacing="0">
                    <Box
                      w="8rem"
                      h="8rem"
                      role="group"
                      position="relative"
                      transition="all 0.2s ease"
                      cursor="pointer"
                      _hover={{
                        transform: "scale(1.05)",
                        zIndex: "1",
                      }}
                    >
                      <Box position="absolute" bottom="0" right="0">
                        <Icon
                          fontSize="2rem"
                          color="gray.0"
                          bgColor="rgba(0,0,0,0.5)"
                          p="0.25rem"
                          borderRadius={"8px"}
                          as={MdEdit}
                          position="relative"
                          zIndex="2"
                          _groupHover={{
                            color: "gray.0",
                          }}
                          onClick={() => {
                            btIsChoosePortrait.set(true);
                            btIsCreateDisplayName.set(false);
                          }}
                        />
                      </Box>
                      <Image
                        onClick={() => {
                          btIsChoosePortrait.set(true);
                          btIsCreateDisplayName.set(false);
                        }}
                        // fallbackSrc={config.https.cdn + 'placeholder.png'}
                        fallback={
                          <VStack
                            w="100%"
                            h="100%"
                            alignItems={"center"}
                            justifyContent={"center"}
                          >
                            <Spinner
                              width="3rem"
                              height="3rem"
                              color="brand.50"
                              size={"sm"}
                            />
                          </VStack>
                        }
                        display="inline-block"
                        src={`${config.https.cdn}images/portraits/${filename}`}
                        // loading="lazy"
                        borderRadius={"8px"}
                        width={["100%"]}
                        transition="all 0.2s ease"
                        boxShadow={"0 0 12px var(--chakra-colors-gray-1000)"}
                        // border='2px solid'
                        // borderColor="transparent"
                        _groupHover={
                          {
                            // border: '2px solid',
                            // borderColor: 'brand.600'
                          }
                        }
                      />
                    </Box>
                    <IconButton
                      icon={<FaRandom size="1.2rem" />}
                      onClick={generatePortrait}
                      width="2rem"
                      isRound="true"
                      _hover={{
                        color: "brand.300",
                      }}
                    />
                  </VStack>
                  <VStack flex="1" spacing="0.5rem" w="100%">
                    <HStack w="100%" justifyContent={"flex-start"}>
                      <FSGTextInput
                        onChange={onChange}
                        maxLength="32"
                        titleColor="gray.100"
                        // title="Pick Name"
                        borderRadius="8px"
                        bgColor="gray.900"
                        height="3.5rem"
                        focus={true}
                        onFocus={(e) => {
                          e.target.select();
                        }}
                        _placeholder={{
                          color: "gray.200",
                        }}
                        _focus={{
                          outline: "none",
                        }}
                        _focusVisible={{
                          border: "2px solid var(--chakra-colors-gray-100)",
                          boxShadow: "none",
                        }}
                        color="gray.0"
                        fontWeight="500"
                        border="2px solid transparent"
                        boxShadow="none"
                        value={displayname}
                        onKeyDown={onKeyDown}
                        // boxShadow={'0 0 12px var(--chakra-colors-gray-1000)'}
                        // helpText={'This is a temporary acount, login to make it permanent'}
                      />
                      <IconButton
                        icon={<FaRandom size="1.2rem" />}
                        onClick={generateName}
                        width="2rem"
                        isRound="true"
                        _hover={{
                          color: "brand.300",
                        }}
                      />
                    </HStack>
                    <Box w="100%" pl="1rem">
                      <ChooseCountry bgColor="transparent" />
                    </Box>
                  </VStack>
                </HStack>
                {hasError && <Text color="red.600">{error.message}</Text>}
                {/* </FSGGroup> */}
                <FSGSubmit
                  _hover={{
                    // border: "4px solid",
                    // borderColor: "brand.300",
                    boxShadow: "7px 3px 0 var(--chakra-colors-brand-300)",
                    // bgColor: 'brand.300',
                  }}
                  _focus={{
                    // border: "4px solid",
                    // borderColor: "brand.300",
                    boxShadow: "7px 3px 0 var(--chakra-colors-brand-300)",
                    // bgColor: 'brand.300',
                  }}
                  // _active={{
                  //     border: "4px solid",
                  //     borderColor: "brand.300",
                  //     bgColor: 'gray.800',
                  // }}
                  px={"3rem"}
                  pb="1rem"
                  transform="skew(-15deg)"
                  boxShadow="3px 3px 0 var(--chakra-colors-brand-600)"
                  // border="4px solid"
                  // borderColor="brand.300"
                  bgColor={"gray.800"}
                  py="2rem"
                  color="white"
                  fontSize="lg"
                  fontWeight="bold"
                  borderRadius="4px"
                  onClick={onSubmit}
                  title={joinButtonTitle}
                  loadingText="Joining"
                />
              </VStack>

              {/* <Heading color="gray.300" pt={'0rem'} pb={'0.5rem'} size="sm">Save your name and track your stats.</Heading> */}

              <SocialLoginButtons />
            </VStack>
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

function updateRefPath(pathname) {
  localStorage.setItem("refPath", pathname);
  // btRefPath.set(pathname);
  removeWithExpiry("user");

  localStorage.setItem("portraitid", btPortraitId.get());
}

function SocialLoginButtons() {
  const location = useLocation();
  let refPath = location.pathname;

  let user = useBucket(btUser);
  if (user && user.email && !user.displayname) {
    return <></>;
  }

  return (
    <>
      <Divider pt={"0"} pb="1rem" />
      <Heading pt="0" mt="0" color="gray.10" fontWeight="400" fontSize="1.4rem">
        <Text as="span" fontWeight="600" color="gray.10">
          Login
        </Text>{" "}
        and access more features for free.
      </Heading>
      <Heading
        pt="0"
        mt="0"
        color="gray.20"
        fontSize="1.2rem"
        pb="1rem"
        fontWeight={"light"}
      >
        By signing in, you agree to our{" "}
        <Link to="/privacy">Privacy Policy</Link>
      </Heading>

      <VStack w="100%" maxWidth="22rem">
        <FacebookLoginButton
          size="2.4rem"
          iconSize="1.4rem"
          style={{ fontSize: "1.2rem" }}
          onClick={() => {
            updateRefPath(refPath);
            window.location.href = "/login/facebook";
          }}
        />
        <GoogleLoginButton
          size="2.4rem"
          iconSize="1.4rem"
          style={{ fontSize: "1.2rem" }}
          onClick={() => {
            updateRefPath(refPath);
            window.location.href = "/login/google";
          }}
        />
        <GithubLoginButton
          size="2.4rem"
          iconSize="1.4rem"
          style={{ fontSize: "1.2rem" }}
          onClick={() => {
            updateRefPath(refPath);
            window.location.href = "/login/github";
          }}
        />
        <MicrosoftLoginButton
          size="2.4rem"
          iconSize="1.4rem"
          style={{ fontSize: "1.2rem" }}
          onClick={() => {
            updateRefPath(refPath);
            window.location.href = "/login/microsoft";
          }}
        />
      </VStack>
    </>
  );
}
