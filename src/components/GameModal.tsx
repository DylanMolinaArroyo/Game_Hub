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
  Grid,
  GridItem,
  ScaleFade,
  Stat,
  StatNumber,
  StatLabel,
  Icon,
  Link,
  Button,
  Badge,
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

const DESCRIPTION_LIMIT = 300;

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

  return (
    <ScaleFade initialScale={0.9} in={isOpen}>
      <Modal isOpen={isOpen} onClose={onClose} isCentered scrollBehavior="inside">
        <ModalOverlay backdropFilter="blur(4px)" />
        <ModalContent
          maxWidth={{ base: "95vw", md: "75vw", lg: "60vw" }}
          maxH="90vh"
          bg="surface.modal"
          borderRadius="xl"
          overflow="hidden"
        >
          <ModalBody p={0} display="flex" flexDirection="column">
            {isLoading ? (
              <Box p={5}>
                <GameModalSkeleton />
              </Box>
            ) : error || !gameProfile ? (
              <Box p={6}>
                <Text color="text.error">{t("loading_error.message")}</Text>
              </Box>
            ) : (
              <>
                {/* Sticky header */}
                <Box
                  px={5}
                  py={4}
                  borderBottom="1px solid"
                  borderColor="border.subtle"
                  position="sticky"
                  top={0}
                  bg="surface.modal"
                  zIndex={1}
                >
                  <Heading
                    size="md"
                    color="text.heading"
                    pr={10}
                    noOfLines={1}
                  >
                    {gameProfile.name}
                  </Heading>
                  <ModalCloseButton
                    top={3}
                    right={4}
                    color="text.muted"
                    _hover={{ color: "red.500", bg: "surface.hover" }}
                    borderRadius="full"
                  />
                </Box>

                {/* Scrollable content */}
                <Box overflowY="auto" px={5} py={5}>
                  {/* Cover + details */}
                  <Grid
                    templateColumns={{ base: "1fr", md: "1fr 1fr" }}
                    gap={5}
                    mb={6}
                  >
                    <GridItem>
                      <Image
                        borderRadius="lg"
                        src={getCroppedImageUrl(gameProfile.background_image)}
                        alt={gameProfile.name}
                        objectFit="cover"
                        w="100%"
                        h={{ base: "200px", md: "320px" }}
                      />
                    </GridItem>
                    <GridItem>
                      <VStack align="stretch" spacing={4} h="100%">
                        <HStack spacing={4} flexWrap="wrap">
                          <CriticScoreExpand score={gameProfile.metacritic} />
                          <Stat>
                            <StatLabel fontSize="md">
                              {t("play_time.message")}
                            </StatLabel>
                            <StatNumber fontSize="xl">
                              <Icon
                                as={MdAccessTime}
                                boxSize={5}
                                color="purple.400"
                                mr={1}
                              />
                              {gameProfile.playtime}h
                            </StatNumber>
                          </Stat>
                        </HStack>

                        <Divider borderColor="border.subtle" />

                        <Box>
                          <Text
                            fontSize="xs"
                            fontWeight="semibold"
                            color="text.muted"
                            textTransform="uppercase"
                            letterSpacing="wider"
                            mb={1}
                          >
                            {t("release_date.message")}
                          </Text>
                          <Badge
                            colorScheme="blue"
                            fontSize="sm"
                            px={2}
                            py={0.5}
                            borderRadius="full"
                          >
                            {gameProfile.released}
                          </Badge>
                        </Box>

                        <Box>
                          <Text
                            fontSize="xs"
                            fontWeight="semibold"
                            color="text.muted"
                            textTransform="uppercase"
                            letterSpacing="wider"
                            mb={1}
                          >
                            {t("developers.message")}
                          </Text>
                          <DeveloperList developers={gameProfile.developers} />
                        </Box>

                        {gameProfile.website && (
                          <Link
                            href={gameProfile.website}
                            isExternal
                            fontSize="sm"
                            color="link.default"
                            _hover={{ color: "link.hover", textDecoration: "underline" }}
                            display="inline-flex"
                            alignItems="center"
                            gap={1}
                            mt="auto"
                          >
                            {t("developer_site.message")}
                            <Icon as={FaExternalLinkAlt} boxSize={3} />
                          </Link>
                        )}
                      </VStack>
                    </GridItem>
                  </Grid>

                  {/* Platforms */}
                  <Box mb={4}>
                    <Text
                      fontSize="xs"
                      fontWeight="semibold"
                      color="text.muted"
                      textTransform="uppercase"
                      letterSpacing="wider"
                      mb={2}
                    >
                      {t("platforms.message")}
                    </Text>
                    <PlatformIconList
                      platforms={gameProfile.parent_platforms?.map((p) => p.platform)}
                      showName={true}
                    />
                  </Box>

                  <Divider borderColor="border.subtle" mb={4} />

                  {/* Selected media */}
                  <Box mb={3} borderRadius="lg" overflow="hidden">
                    {selectedMedia?.endsWith(".mp4") ? (
                      <video
                        controls
                        width="100%"
                        src={selectedMedia}
                        style={{ display: "block", maxHeight: "360px" }}
                      />
                    ) : (
                      <Image
                        src={selectedMedia || ""}
                        alt={gameProfile.name}
                        objectFit="cover"
                        w="100%"
                        maxH="360px"
                      />
                    )}
                  </Box>

                  {/* Thumbnail strip */}
                  {(gameVideos?.length || gameImages?.length) ? (
                    <HStack
                      spacing={2}
                      overflowX="auto"
                      pb={3}
                      mb={4}
                      sx={{ "&::-webkit-scrollbar": { height: "4px" }, "&::-webkit-scrollbar-thumb": { borderRadius: "full", bg: "border.subtle" } }}
                    >
                      {gameVideos?.slice(0, 2).map((trailer) => (
                        <Box
                          key={trailer.id}
                          as="button"
                          flexShrink={0}
                          borderRadius="md"
                          overflow="hidden"
                          outline="2px solid"
                          outlineColor={selectedMedia === trailer.data.max ? "blue.400" : "transparent"}
                          onClick={() => setSelectedMedia(trailer.data.max)}
                          transition="outline-color 0.15s"
                          _hover={{ outlineColor: "blue.300" }}
                        >
                          <Image
                            src={trailer.preview}
                            w="120px"
                            h="70px"
                            objectFit="cover"
                          />
                        </Box>
                      ))}
                      {gameImages?.slice(0, 8).map((image, index) => (
                        <Box
                          key={index}
                          as="button"
                          flexShrink={0}
                          borderRadius="md"
                          overflow="hidden"
                          outline="2px solid"
                          outlineColor={selectedMedia === image.image ? "blue.400" : "transparent"}
                          onClick={() => setSelectedMedia(image.image)}
                          transition="outline-color 0.15s"
                          _hover={{ outlineColor: "blue.300" }}
                        >
                          <Image
                            src={image.image}
                            w="120px"
                            h="70px"
                            objectFit="cover"
                          />
                        </Box>
                      ))}
                    </HStack>
                  ) : null}

                  <Divider borderColor="border.subtle" mb={4} />

                  {/* Description */}
                  <Box>
                    <Text
                      fontSize="xs"
                      fontWeight="semibold"
                      color="text.muted"
                      textTransform="uppercase"
                      letterSpacing="wider"
                      mb={2}
                    >
                      {t("description.message")}
                    </Text>
                    <Text color="text.heading" lineHeight="tall">
                      <CleanDescription
                        description={
                          isDescriptionExpanded
                            ? gameProfile.description
                            : gameProfile.description.slice(0, DESCRIPTION_LIMIT) + "..."
                        }
                        targetLanguage={i18n.language}
                      />
                    </Text>
                    {gameProfile.description.length > DESCRIPTION_LIMIT && (
                      <Button
                        onClick={() => setIsDescriptionExpanded((v) => !v)}
                        mt={2}
                        variant="link"
                        colorScheme="blue"
                        size="sm"
                      >
                        {isDescriptionExpanded
                          ? t("read_less.message")
                          : t("read_more.message")}
                      </Button>
                    )}
                  </Box>
                </Box>
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </ScaleFade>
  );
};

export default GameModal;
