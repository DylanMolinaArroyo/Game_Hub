import { BoxProps } from "@chakra-ui/react";
import { ReactNode } from "react";

export interface Props extends BoxProps {
  children: ReactNode;
  onFavoriteClick?: () => void;
  isFavorite?: boolean;
}
