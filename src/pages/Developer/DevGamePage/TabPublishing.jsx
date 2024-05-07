import {
    Card,
    CardBody,
    CardHeader,
    Grid,
    Heading,
    VStack,
} from "@chakra-ui/react";
import GitHubCopy from "./GitHubCopy.jsx";
import DeploymentCommand from "./DeploymentCommand.jsx";
import Publishing from "./Publishing.jsx";

export default function TabDeployment({}) {
    return (
        <Grid
            templateColumns={{ sm: "1fr", md: "1fr", lg: "1.5fr 3fr " }}
            templateRows={{ sm: "repeat(2, 1fr)", lg: "1fr" }}
            gap="24px"
            mb={{ lg: "26px" }}
        >
            <Publishing />

            <Card pb="2rem">
                <CardHeader>
                    <Heading as="h3" fontSize="1.8rem">
                        Clone and Deploy
                    </Heading>
                </CardHeader>
                <CardBody>
                    <VStack gap="2rem">
                        <GitHubCopy />
                        <DeploymentCommand />
                    </VStack>
                </CardBody>
            </Card>
        </Grid>
    );
}
