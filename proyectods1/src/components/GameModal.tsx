import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Box,
  Text,
  Heading,
  Image,
  HStack,
  Spinner,
  Divider,
  VStack,
  useColorModeValue,
  Grid,
  GridItem,
  Center,
  ScaleFade,
  Stat,
  StatNumber,
  StatLabel,
} from "@chakra-ui/react";
import useGameProfile from "../hooks/useGameProfile";
import { IoIosCloseCircle } from "react-icons/io";
import getCroppedImageUrl from "../services/image-url";
import PlatformIconList from "./PlatformIconList";
import CriticScoreExpand from "./CriticScoreExpand";
import CleanDescription from "./CleanDescription";
import DeveloperList from "./DevelopersList";
import useGameVideos from "../hooks/useGameVideos";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  gameId: number;
}

const GameModal = ({ isOpen, onClose, gameId }: Props) => {
  const { data: gameProfile, error, isLoading } = useGameProfile(gameId);
  const { data: gameVideos } = useGameVideos(gameId);

  const modalBg = useColorModeValue("gray.50", "gray.800");
  const headingColor = useColorModeValue("gray.700", "whiteAlpha.900");

  if (isLoading) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent bg={modalBg}>
          <ModalBody display="flex" justifyContent="center" alignItems="center">
            <Spinner size="xl" />
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  }

  if (error || !gameProfile) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent bg={modalBg}>
          <ModalBody>
            <Text color="red.500">Error loading game data.</Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  }

  return (
    <ScaleFade initialScale={0.9} in={isOpen}>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent
          maxWidth="60vw"
          bg={modalBg}
          borderRadius="md"
          overflow="hidden"
        >
          <HStack padding={4} bg="normal" color="normal">
            <Heading fontSize="lg" fontWeight="bold">
              {gameProfile.name}
            </Heading>
            <ModalCloseButton as={IoIosCloseCircle} boxSize="30px" />
          </HStack>
          <ModalBody padding={2}>
            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              <GridItem>
                <Image
                  borderRadius="md"
                  src={getCroppedImageUrl(gameProfile.background_image)}
                  alt={gameProfile.name}
                  objectFit="cover"
                  maxHeight="400px"
                />
              </GridItem>
              <GridItem>
                <Heading size="lg">{gameProfile.name}</Heading>
                <Center height="20px">
                  <Divider orientation="horizontal" color="white" />
                </Center>
                <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                  <GridItem>
                    <CriticScoreExpand score={gameProfile.metacritic} />
                  </GridItem>
                  <GridItem>
                    <Stat>
                      <StatLabel fontSize={20}>Play Time</StatLabel>
                      <StatNumber>{gameProfile.playtime} Hours</StatNumber>
                    </Stat>
                  </GridItem>
                </Grid>
                <HStack marginBottom={2} marginTop={2}>
                  <Heading size="md" color={headingColor}>
                    Release Date:
                  </Heading>
                  <Text fontSize="18px" color={headingColor}>
                    {gameProfile.released}
                  </Text>
                </HStack>

                <Heading
                  size="md"
                  color={headingColor}
                  marginBottom={2}
                  marginTop={4}
                >
                  Developers
                </Heading>
                <DeveloperList
                  developers={gameProfile.developers}
                ></DeveloperList>
              </GridItem>
            </Grid>
            <Heading
              size="md"
              color={headingColor}
              marginBottom={2}
              marginTop={4}
            >
              Platforms
            </Heading>
            <PlatformIconList
              platforms={gameProfile.parent_platforms?.map((p) => p.platform)}
              showName={true}
            />
            <HStack>
              <Box>
                {gameVideos?.map((trailer) => (
                  <Box key={trailer.id} marginBottom={4}>
                    <video controls width="100%">
                      <source src={trailer.data.max} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </Box>
                ))}
              </Box>
            </HStack>
            <VStack spacing={4} align="stretch" marginTop={4}>
              <Divider orientation="horizontal" />
              <Box>
                <Heading size="md" color={headingColor} marginBottom={2}>
                  Description
                </Heading>
                <Text>
                  <CleanDescription
                    description={gameProfile.description}
                  ></CleanDescription>
                </Text>
              </Box>
              <Divider orientation="horizontal" />
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </ScaleFade>
  );
};

export default GameModal;
