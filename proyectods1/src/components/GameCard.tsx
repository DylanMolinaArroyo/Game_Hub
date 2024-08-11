import { useState } from "react";
import { Game } from "../hooks/useGames";
import {
  Card,
  Image,
  CardBody,
  HStack,
  Button,
  useColorModeValue,
  Fade,
} from "@chakra-ui/react";
import PlatformIconList from "./PlatformIconList";
import CriticScore from "./CriticScore";
import getCroppedImageUrl from "../services/image-url";
import GameModal from "./GameModal";

interface Props {
  game: Game;
}

const GameCard = ({ game }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false); // Estado para manejar la carga de la imagen
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const headingColor = useColorModeValue("gray.700", "whiteAlpha.900");

  return (
    <>
      <Card>
        <Fade in={isImageLoaded}>
          <Image
            src={getCroppedImageUrl(game.background_image)}
            onLoad={() => setIsImageLoaded(true)}
          />
        </Fade>

        <CardBody>
          <HStack justifyContent="space-between" marginBottom={3}>
            <PlatformIconList
              platforms={game.parent_platforms?.map((p) => p.platform)}
              showName={false}
            />
            <CriticScore score={game.metacritic} />
          </HStack>
          <Button
            whiteSpace="normal"
            textAlign="left"
            onClick={handleOpen}
            fontSize="2xl"
            fontWeight="bold"
            variant="link"
            color={headingColor}
          >
            {game.name}
          </Button>
        </CardBody>
      </Card>

      {isOpen && (
        <GameModal isOpen={isOpen} onClose={handleClose} gameId={game.id} />
      )}
    </>
  );
};

export default GameCard;
