import { IoIosCloseCircle } from "react-icons/io";
import { Button, Icon } from "@chakra-ui/react";

interface ClearFiltersButtonProps {
  onClick: () => void;
}

const ClearFiltersButton = ({ onClick }: ClearFiltersButtonProps) => {
  return (
    <Button
      leftIcon={<Icon as={IoIosCloseCircle} />}
      borderRadius={20}
      aria-label={"Clear filters"}
      onClick={onClick}
    >
      Clear filters
    </Button>
  );
};

export default ClearFiltersButton;
