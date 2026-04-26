import { IoCloseCircle } from "react-icons/io5";
import { Button, Icon } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { ClearFiltersButtonProps } from "./ClearFiltersButton.types";


const ClearFiltersButton = ({ onClick }: ClearFiltersButtonProps) => {
  const { t } = useTranslation();
  return (
    <Button
      leftIcon={<Icon as={IoCloseCircle} />}
      borderRadius={20}
      aria-label={t("clear_filter.message")}
      onClick={onClick}
    >
      {t("clear_filter.message")}
    </Button>
  );
};

export default ClearFiltersButton;
