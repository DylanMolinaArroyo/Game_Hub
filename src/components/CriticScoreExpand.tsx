import { Icon, Stat, StatLabel, StatNumber } from "@chakra-ui/react";
import { SiMetacritic } from "react-icons/si";
import { useTranslation } from "react-i18next";

interface Props {
  score: number;
}

const CriticScoreExpand = ({ score }: Props) => {
  const { t } = useTranslation();
  return (
    <Stat alignItems="center">
      <StatLabel fontSize={20}>{t("metacritic.message")}</StatLabel>
      <StatNumber>
        <Icon as={SiMetacritic} size={"30px"} color="yellow.500" /> {score}%
      </StatNumber>
    </Stat>
  );
};

export default CriticScoreExpand;
