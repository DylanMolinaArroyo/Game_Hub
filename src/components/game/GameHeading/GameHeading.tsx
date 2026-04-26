import { memo } from "react";
import { Heading } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

const GameHeading = memo(function GameHeading() {
  const { t } = useTranslation();

  return (
    <Heading as="h1" marginY={5} fontSize={{ base: "3xl", md: "5xl" }}>
      {t("games_heading.message")}
    </Heading>
  );
});

export default GameHeading;
