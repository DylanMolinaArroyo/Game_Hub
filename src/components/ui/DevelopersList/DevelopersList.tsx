import { Heading, Box, HStack } from "@chakra-ui/react";
import { Props } from "./DevelopersList.types";


const DeveloperList = ({ developers }: Props) => {
  return (
    <HStack spacing={2} align="start" marginY={1}>
      {developers.map((developer) => (
        <Box
          key={developer.id}
          padding={2}
          borderRadius="md"
          borderWidth="1px"
          borderColor="gray.200"
        >
          <Heading size="xs">{developer.name}</Heading>
        </Box>
      ))}
    </HStack>
  );
};

export default DeveloperList;
