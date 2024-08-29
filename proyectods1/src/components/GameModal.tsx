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
  Icon,
  Card,
  Link,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useGameProfile from "../hooks/useGameProfile";
import getCroppedImageUrl from "../services/image-url";
import PlatformIconList from "./PlatformIconList";
import CriticScoreExpand from "./CriticScoreExpand";
import CleanDescription from "./CleanDescription";
import DeveloperList from "./DevelopersList";
import useGameVideos from "../hooks/useGameVideos";
import useGameImages from "../hooks/useGamesImages";
import { MdAccessTime } from "react-icons/md";
import GameModalSkeleton from "./GameModalSkeleton";
import { FaExternalLinkAlt } from "react-icons/fa";
import i18n from "../config/i18n";
import { useTranslation } from "react-i18next";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  gameId: number;
}

const GameModal = ({ isOpen, onClose, gameId }: Props) => {
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const {
    data: gameProfile,
    error,
    isLoading,
    refetch: refetchProfile,
  } = useGameProfile(gameId);
  const { data: gameVideos, refetch: refetchVideos } = useGameVideos(gameId);
  const { data: gameImages, refetch: refretchImages } = useGameImages(gameId);
  const { t } = useTranslation();

  const modalBg = useColorModeValue("gray.50", "gray.800");
  const headingColor = useColorModeValue("gray.700", "whiteAlpha.900");
  const closeButtonColor = useColorModeValue(
    "blackAlpha.700",
    "whiteAlpha.900"
  );

  const linkColor = useColorModeValue("blue.500", "blue.300");
  const linkHoverColor = useColorModeValue("blue.600", "blue.400");
  const linkFocusColor = useColorModeValue("blue.700", "blue.500");

  useEffect(() => {
    if (isOpen && !isDataLoaded) {
      refetchProfile();
      refetchVideos();
      refretchImages();
      setIsDataLoaded(true);
    }
  }, [isOpen, isDataLoaded, refetchProfile, refetchVideos]);

  useEffect(() => {
    if (gameProfile?.background_image) {
      const firstMedia =
        gameVideos?.[0]?.data.max ||
        gameImages?.[0]?.image ||
        getCroppedImageUrl(gameProfile.background_image);
      setSelectedMedia(firstMedia);
    }
  }, [gameProfile, gameVideos, gameImages]);

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  const truncatedDescription = gameProfile?.description.slice(0, 100) + "...";

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
          <ModalBody padding={2}>
            {isLoading ? (
              <GameModalSkeleton isOpen={true} onClose={() => {}} />
            ) : error || !gameProfile ? (
              <Text>{t("loading_error.message")}</Text>
            ) : (
              <>
                <HStack
                  padding={4}
                  bg="normal"
                  color={headingColor}
                  marginBottom={1}
                >
                  <Heading fontSize="lg" fontWeight="normal">
                    {gameProfile.name}
                  </Heading>
                  <ModalCloseButton
                    color={closeButtonColor}
                    _hover={{ color: "red.500" }}
                    size="lg"
                  />
                </HStack>
                <Card padding={3} marginBottom={4}>
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
                        <Divider
                          orientation="horizontal"
                          borderWidth="2px"
                          width="full"
                          color={headingColor}
                        />
                      </Center>
                      <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                        <GridItem>
                          <CriticScoreExpand score={gameProfile.metacritic} />
                        </GridItem>
                        <GridItem>
                          <Stat>
                            <StatLabel fontSize={20}>
                              {t("play_time.message")}
                            </StatLabel>
                            <StatNumber>
                              <Icon
                                as={MdAccessTime}
                                size={"30px"}
                                color={"#553C9A"}
                              />{" "}
                              {gameProfile.playtime} {t("hours.message")}
                            </StatNumber>
                          </Stat>
                        </GridItem>
                      </Grid>
                      <HStack marginBottom={2} marginTop={2}>
                        <Heading size="md" color={headingColor}>
                          {t("release_date.message")}
                        </Heading>
                        <Text fontSize="18px" color={headingColor}>
                          {gameProfile.released}
                        </Text>
                      </HStack>
                      <Heading
                        size="md"
                        color={headingColor}
                        marginBottom={2}
                        marginTop={2}
                      >
                        {t("developers.message")}
                      </Heading>
                      <DeveloperList
                        developers={gameProfile.developers}
                      ></DeveloperList>
                      <Link
                        href={gameProfile.website}
                        isExternal
                        fontSize="15px"
                        color={linkColor}
                        _hover={{
                          color: linkHoverColor,
                          textDecoration: "underline",
                        }}
                        _focus={{ color: linkFocusColor, boxShadow: "outline" }}
                        display="inline-flex"
                        alignItems="center"
                      >
                        {t("developer_site.message")}
                        <Icon as={FaExternalLinkAlt} ml={2} />
                      </Link>
                    </GridItem>
                  </Grid>
                </Card>

                <Heading size="md" color={headingColor} marginBottom={2}>
                  {t("platforms.message")}
                </Heading>
                <PlatformIconList
                  platforms={gameProfile.parent_platforms?.map(
                    (p) => p.platform
                  )}
                  showName={true}
                />

                <Center height="20px">
                  <Divider
                    orientation="horizontal"
                    borderWidth="2px"
                    width="full"
                    color={headingColor}
                  />
                </Center>
                <GridItem colSpan={2}>
                  {selectedMedia?.endsWith(".mp4") ? (
                    <video controls width="100%" src={selectedMedia} />
                  ) : (
                    <Image
                      borderRadius="md"
                      src={selectedMedia || ""}
                      alt={gameProfile.name}
                      objectFit="cover"
                      maxHeight="400px"
                      width="100%"
                    />
                  )}
                </GridItem>
                <HStack
                  overflowX="scroll"
                  overscrollBehaviorX="revert"
                  paddingY={4}
                >
                  <HStack paddingX={"10px"}>
                    {gameVideos?.slice(0, 2).map((trailer) => (
                      <Image
                        key={trailer.id}
                        src={trailer.preview}
                        width="150px"
                        height="auto"
                        objectFit="cover"
                        cursor="pointer"
                        onClick={() => setSelectedMedia(trailer.data.max)}
                        marginX={2}
                      />
                    ))}
                    {gameImages?.slice(0, 8).map((image, index) => (
                      <Image
                        key={index}
                        src={image.image}
                        width="150px"
                        height="auto"
                        objectFit="cover"
                        cursor="pointer"
                        onClick={() => setSelectedMedia(image.image)}
                        marginX={2}
                      />
                    ))}
                  </HStack>
                </HStack>
                <VStack spacing={4} align="stretch" marginTop={4}>
                  <Center height="20px">
                    <Divider
                      orientation="horizontal"
                      borderWidth="2px"
                      width="full"
                      color={headingColor}
                    />
                  </Center>
                  <Box>
                    <Heading size="md" color={headingColor} marginBottom={2}>
                      {t("description.message")}
                    </Heading>
                    <Text textAlign="justify">
                      <CleanDescription
                        description={
                          isDescriptionExpanded
                            ? gameProfile.description
                            : truncatedDescription
                        }
                        targetLanguage={i18n.language}
                      />
                    </Text>
                    <Button
                      onClick={toggleDescription}
                      mt={2}
                      variant="link"
                      colorScheme="blue"
                    >
                      {isDescriptionExpanded
                        ? t("read_less.message")
                        : t("read_more.message")}
                    </Button>
                  </Box>
                  <Divider
                    orientation="horizontal"
                    borderWidth="2px"
                    width="full"
                  />
                </VStack>
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </ScaleFade>
  );
};

export default GameModal;
