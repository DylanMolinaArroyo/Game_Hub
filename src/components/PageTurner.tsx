import { Flex, Button, Text } from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";

interface PaginationControlsProps {
  page: number;
  totalPages: number;
  onPreviousPage: () => void;
  onNextPage: () => void;
}

const PageTurner = ({
  page,
  totalPages,
  onPreviousPage,
  onNextPage,
}: PaginationControlsProps) => {
  return (
    <Flex justifyContent="center" padding="10px" alignItems="center" gap="4px">
      <Button
        onClick={onPreviousPage}
        isDisabled={page === 1}
        size="sm"
        borderRadius="full"
        padding="8px"
      >
        <ArrowBackIcon />
      </Button>
      <Text>
        {page} / {totalPages}
      </Text>
      <Button
        onClick={onNextPage}
        isDisabled={page === totalPages}
        size="sm"
        borderRadius="full"
        padding="8px"
      >
        <ArrowForwardIcon />
      </Button>
    </Flex>
  );
};

export default PageTurner;
