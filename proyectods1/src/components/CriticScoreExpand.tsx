import {
  CircularProgress,
  CircularProgressLabel,
  Icon,
  Stat,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import { SiMetacritic } from "react-icons/si";
interface Props {
  score: number;
}
const CriticScoreExpand = ({ score }: Props) => {
  let color = score > 75 ? "green" : score > 60 ? "darkyellow" : "";

  return (
    <Stat alignItems="center">
      <StatLabel fontSize={20}>Metacritic Score</StatLabel>
      <StatNumber>
        <Icon as={SiMetacritic} size={"30px"} color="#D69E2E" /> {score}%
      </StatNumber>
    </Stat>
  );
};

export default CriticScoreExpand;
