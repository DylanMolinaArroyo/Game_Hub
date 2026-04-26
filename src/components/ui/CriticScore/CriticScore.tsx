import { Badge } from "@chakra-ui/react";
import { Props } from "./CriticScore.types";

const CriticScore = ({ score }: Props) => {
  let color = score > 75 ? "green" : score > 60 ? "yellow" : "";

  return (
    <div>
      <Badge
        colorScheme={color}
        fontSize="14px"
        paddingX={2}
        borderRadius="4px"
      >
        {score}
      </Badge>
    </div>
  );
};

export default CriticScore;
