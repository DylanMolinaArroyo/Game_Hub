import { Heading } from "@chakra-ui/react";
import useTranslateText from "../hooks/useTranslation"; // Asegúrate de que la ruta sea correcta
import { GameQuery } from "../App";

interface Props {
  gameQuery: GameQuery;
  targetLanguage: string;
}

const GameHeading = ({ gameQuery, targetLanguage }: Props) => {
  const heading = `${gameQuery.platform?.name || ""} ${
    gameQuery.genre?.name || ""
  } Games`;
  const translatedHeading = useTranslateText(heading, targetLanguage);

  return (
    <Heading as="h1" marginY={5} fontSize="5xl">
      {translatedHeading}
    </Heading>
  );
};

export default GameHeading;
