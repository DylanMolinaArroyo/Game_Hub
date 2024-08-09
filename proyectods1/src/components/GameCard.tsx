import { useState } from "react";
import { Game } from "../hooks/useGames";
import { Card, Image, CardBody, HStack, Button } from "@chakra-ui/react";
import PlatformIconList from "./PlatformIconList";
import CriticScore from "./CriticScore";
import getCroppedImageUrl from "../services/image-url";
import GameModal from "./GameModal";

interface Props {
  game: Game;
}

const GameCard = ({ game }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <Card>
        <Image src={getCroppedImageUrl(game.background_image)} />
        <CardBody>
          <HStack justifyContent="space-between" marginBottom={3}>
            <PlatformIconList
              platforms={game.parent_platforms?.map((p) => p.platform)}
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
            color="white"
          >
            {game.name}
          </Button>
        </CardBody>
      </Card>

      <GameModal isOpen={isOpen} onClose={handleClose} gameId={game.id} />
    </>
  );
};

export default GameCard;
