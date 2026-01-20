import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  HStack,
  Heading,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Grid,
  GridItem,
  VStack,
  Divider,
  Box,
  Center,
} from "@chakra-ui/react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const GameModalSkeleton = ({ isOpen, onClose }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent maxWidth="60vw" borderRadius="md" overflow="hidden">
        <ModalBody padding={2}>
          <HStack padding={4} bg="normal" color="gray.700" marginBottom={1}>
            <Skeleton height="20px" width="150px" />
            <SkeletonCircle size="10" />
          </HStack>
          <Skeleton padding={3} marginBottom={4}>
            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              <GridItem>
                <Skeleton height="400px" borderRadius="md" />
              </GridItem>
              <GridItem>
                <Skeleton height="30px" marginBottom={4} />
                <Skeleton height="20px" marginBottom={2} />
                <Skeleton height="20px" marginBottom={2} />
                <Skeleton height="20px" marginBottom={4} />
                <Skeleton height="20px" />
              </GridItem>
            </Grid>
          </Skeleton>
          <Heading size="md" color="gray.700" marginBottom={2}>
            Platforms
          </Heading>
          <Skeleton height="30px" width="200px" />
          <Center height="20px">
            <Divider
              orientation="horizontal"
              borderWidth="2px"
              width="full"
              color="gray.700"
            />
          </Center>
          <GridItem colSpan={2}>
            <Skeleton height="400px" width="100%" />
          </GridItem>
          <HStack overflowX="scroll" overscrollBehaviorX="revert" paddingY={4}>
            <HStack paddingX={"10px"}>
              <Skeleton
                height="150px"
                width="150px"
                borderRadius="md"
                marginX={2}
              />
              <Skeleton
                height="150px"
                width="150px"
                borderRadius="md"
                marginX={2}
              />
            </HStack>
          </HStack>
          <VStack spacing={4} align="stretch" marginTop={4}>
            <Center height="20px">
              <Divider
                orientation="horizontal"
                borderWidth="2px"
                width="full"
                color="gray.700"
              />
            </Center>
            <Box>
              <Heading size="md" color="gray.700" marginBottom={2}>
                Description
              </Heading>
              <SkeletonText mt="4" noOfLines={4} spacing="4" />
            </Box>
            <Divider orientation="horizontal" borderWidth="2px" width="full" />
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default GameModalSkeleton;
