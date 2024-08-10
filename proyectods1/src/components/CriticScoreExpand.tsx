import {
  CircularProgress,
  CircularProgressLabel,
  Stat,
  StatLabel,
} from "@chakra-ui/react";

interface Props {
  score: number;
}
const CriticScoreExpand = ({ score }: Props) => {
  let color = score > 75 ? "green" : score > 60 ? "yellow" : "";

  return (
    <Stat alignItems="center">
      <StatLabel fontSize={20}>Metacritic Score</StatLabel>
      <CircularProgress value={score} color={color} size="70px" mt={4}>
        <CircularProgressLabel>{score}%</CircularProgressLabel>
      </CircularProgress>
    </Stat>
  );
};

export default CriticScoreExpand;
