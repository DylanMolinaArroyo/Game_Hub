import { memo, useState } from "react";
import {
  Card,
  Image,
  CardBody,
  HStack,
  Button,
  Fade,
  Tooltip,
} from "@chakra-ui/react";
import getCroppedImageUrl from "../../../services/image-url";
import GameModal from "../GameModal";
import { Props } from "./GameCard.types";
import { PlatformIconList, CriticScore } from "../../ui";

const GameCard = memo(function GameCard({ game }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <>
      <Card borderRadius="md" boxShadow="md" overflow="hidden">
        <Fade in={isImageLoaded}>
          <Image
            src={getCroppedImageUrl(game.background_image)}
            onLoad={() => setIsImageLoaded(true)}
            objectFit="cover"
            width="100%"
            height="200px"
            loading="lazy"
          />
        </Fade>

        <CardBody backgroundColor="surface">
          <HStack justifyContent="space-between" marginBottom={3}>
            <PlatformIconList
              platforms={game.parent_platforms?.map((p) => p.platform)}
              showName={false}
            />
            <CriticScore score={game.metacritic} />
          </HStack>
          <Tooltip
            label={game.name}
            aria-label={game.name}
            placement="bottom-end"
          >
            <Button
              whiteSpace="nowrap"
              textOverflow="ellipsis"
              overflow="hidden"
              onClick={() => setIsOpen(true)}
              fontSize="2xl"
              fontWeight="bold"
              variant="link"
              color="text.heading"
              maxWidth="250px"
              textAlign="left"
              display="block"
            >
              {game.name}
            </Button>
          </Tooltip>
        </CardBody>
      </Card>

      {isOpen && (
        <GameModal isOpen={isOpen} onClose={() => setIsOpen(false)} gameId={game.id} />
      )}
    </>
  );
});

export default GameCard;
