import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, Text, useToast, VStack } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { withRouter } from "react-router-dom";
import { deleteGame } from "../../actions/devgame";



function DevManageGameDelete(props) {

    const [isOpen, setIsOpen] = useState(false)
    const onClose = () => setIsOpen(false)
    const cancelRef = useRef()

    const toast = useToast();

    const onDelete = async (e) => {
        try {
            let game = await deleteGame();
            if (!game) {

                toast({
                    title: "Fix errors to continue",
                    status: 'error',
                    isClosable: true,
                    duration: 1200
                })

                return;
            }

            toast({
                title: "Successfully deleted",
                status: 'success',
                isClosable: true,
                duration: 1200
            })

            setTimeout(() => {
                props.history.replace('/dev/game/');
            }, 1)
        }
        catch (e) {
            console.error(e);
        }
    }

    return (
        <VStack>
            <Button size="xs" onClick={() => setIsOpen(true)}><Text as="span" color="gray.300">Delete</Text></Button>

            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Delete Draft: {props.devgame?.name}
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure?  <br />This will free up the Slug Name: {props.devgame?.game_slug}
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme='green' onClick={onDelete} ml={3}>
                                Delete Draft Game
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </VStack>
    )
}

export default withRouter(DevManageGameDelete);