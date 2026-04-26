import { Flex, Button, Text, Icon } from "@chakra-ui/react";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import { PaginationControlsProps } from "./PageTurner.types";


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
        <Icon as={IoArrowBack} />
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
        <Icon as={IoArrowForward} />
      </Button>
    </Flex>
  );
};

export default PageTurner;
