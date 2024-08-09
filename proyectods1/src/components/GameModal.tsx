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
  List,
  ListItem,
  ListIcon,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import useGameProfile from "../hooks/useGameProfile";
import { IoIosCloseCircle } from "react-icons/io";
import getCroppedImageUrl from "../services/image-url";
import CriticScore from "./CriticScore";
import PlatformIconList from "./PlatformIconList";
import { MdCheckCircle } from "react-icons/md";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  gameId: number;
}

const GameModal = ({ isOpen, onClose, gameId }: Props) => {
  const { data: gameProfile, error, isLoading } = useGameProfile(gameId);
  const modalBg = useColorModeValue("gray.50", "gray.800");
  const headingColor = useColorModeValue("gray.700", "whiteAlpha.900");
  const textColor = useColorModeValue("gray.600", "gray.300");

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
          <Grid>
            <GridItem w="50%">
              <Image
                borderRadius="md"
                src={getCroppedImageUrl(gameProfile.background_image)}
                alt={gameProfile.name}
                objectFit="cover"
                maxHeight="400px"
              />
            </GridItem>
            <GridItem w="50%">
              <Heading size="lg">{gameProfile.name}</Heading>
            </GridItem>
          </Grid>

          <Heading size="md" color={headingColor} marginBottom={2}>
            Platforms
          </Heading>
          <List spacing={2}>
            {gameProfile.parent_platforms.map((p) => (
              <ListItem key={p.platform.id}>
                <ListIcon as={MdCheckCircle} color="teal.500" />
                {p.platform.name}
              </ListItem>
            ))}
          </List>

          <VStack spacing={4} align="stretch" marginTop={4}>
            <HStack justifyContent="space-between">
              <CriticScore score={gameProfile.metacritic} />
            </HStack>
            <Divider orientation="horizontal" />
            <Box>
              <Heading size="md" color={headingColor} marginBottom={2}>
                Description
              </Heading>
              <Text color={textColor}>{gameProfile.description}</Text>
            </Box>
            <Divider orientation="horizontal" />
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default GameModal;
