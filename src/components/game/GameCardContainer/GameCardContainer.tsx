import { Box, BoxProps, Button, Icon } from "@chakra-ui/react";
import { memo, ReactNode, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { IoMdHeartDislike } from "react-icons/io";

interface Props extends BoxProps {
  children: ReactNode;
  onFavoriteClick?: () => void;
  isFavorite?: boolean;
}

const GameCardContainer = memo(function GameCardContainer({
  children,
  onFavoriteClick,
  isFavorite,
  ...boxProps
}: Props) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Box
      position="relative"
      borderRadius={10}
      overflow="hidden"
      transition="transform 0.3s"
      _hover={{ transform: "scale(1.05)" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...boxProps}
    >
      {children}
      {onFavoriteClick !== undefined && isHovered && (
        <Button
          position="absolute"
          top={2}
          right={2}
          onClick={onFavoriteClick}
          zIndex={1}
          backgroundColor="whiteAlpha.800"
          _hover={{ backgroundColor: "white" }}
          borderRadius="full"
          padding={1}
        >
          <Icon
            as={isFavorite ? IoMdHeartDislike : FaHeart}
            color="red.400"
            boxSize={6}
          />
        </Button>
      )}
    </Box>
  );
});

export default GameCardContainer;
